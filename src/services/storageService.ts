import { supabase } from '../lib/supabaseClient';
import { subjectToStorageMap, storageToSubjectMap } from '../config/subjectStorageMapping';

export interface ResourceFile {
  id: string;
  name: string;
  displayName: string;
  fullPath: string;
  subject: string;
  type: string;
  unit?: string; // u1, u2, u3, u4 for notes or midsem, endsem for pyq
  signedUrl: string;
  size?: number;
  lastModified?: string;
}

export interface StorageObject {
  name: string;
  id?: string;
  updated_at?: string;
  created_at?: string;
  last_accessed_at?: string;
  metadata?: {
    size?: number;
    mimetype?: string;
  };
}

export class StorageService {
  private bucketName = 'reso';
  private signedUrlCache = new Map<string, { url: string; expires: number }>();

  /**
   * Get signed URL with caching (valid for 1 hour)
   */
  private async getSignedUrl(filePath: string): Promise<string> {
    const now = Date.now();
    const cached = this.signedUrlCache.get(filePath);

    // Return cached URL if it's still valid (with 5-minute buffer)
    if (cached && cached.expires > now + 5 * 60 * 1000) {
      return cached.url;
    }

    try {
      const { data, error } = await supabase.storage
        .from(this.bucketName)
        .createSignedUrl(filePath, 3600); // 1 hour expiry

      if (error) {
        throw error;
      }

      // Cache the signed URL
      this.signedUrlCache.set(filePath, {
        url: data.signedUrl,
        expires: now + 3600 * 1000 // 1 hour from now
      });

      return data.signedUrl;
    } catch (error) {
      throw error;
    }
  }

  /**
   * List files in a specific folder
   */
  private async listFilesInFolder(folderPath: string): Promise<StorageObject[]> {
    try {
      const { data, error } = await supabase.storage
        .from(this.bucketName)
        .list(folderPath, {
          limit: 100,
          offset: 0,
          sortBy: { column: 'name', order: 'asc' }
        });

      if (error) {
        return [];
      }

      return data || [];
    } catch (error) {
      return [];
    }
  }

  /**
   * Get files for a specific subject and type
   */
  async getFilesForSubjectType(subject: string, type: string): Promise<ResourceFile[]> {
    try {
      const resources: ResourceFile[] = [];
      const storageSubject = subjectToStorageMap[subject] || subject;
      const basePath = `${storageSubject}/${type}`;

      if (type === 'notes' || type === 'pyqs') {
        // These types have subfolders (units or exam types)
        const folders = await this.listFilesInFolder(basePath);
        
        // Filter for folders only (metadata === null)
        const subfolders = folders.filter(item => item.metadata === null);
        
        for (const subfolder of subfolders) {
          const subfolderPath = `${basePath}/${subfolder.name}`;
          const files = await this.listFilesInFolder(subfolderPath);
          
          // Process files in this subfolder
          for (const file of files) {
            if (file.metadata !== null) { // This is a file
              const fullPath = `${subfolderPath}/${file.name}`;
              const signedUrl = await this.getSignedUrl(fullPath);
              
              resources.push({
                id: file.id || fullPath,
                name: file.name,
                displayName: this.getDisplayName(file.name),
                fullPath,
                subject: storageToSubjectMap[storageSubject] || subject,
                type,
                unit: subfolder.name, // u1, u2, u3, u4 or midsem, endsem
                signedUrl,
                size: file.metadata?.size,
                lastModified: file.updated_at || file.created_at
              });
            }
          }
        }
      } else {
        // syllab and book are directly in the type folder
        const files = await this.listFilesInFolder(basePath);
        
        for (const file of files) {
          if (file.metadata !== null) { // This is a file
            const fullPath = `${basePath}/${file.name}`;
            const signedUrl = await this.getSignedUrl(fullPath);
            
            resources.push({
              id: file.id || fullPath,
              name: file.name,
              displayName: this.getDisplayName(file.name),
              fullPath,
              subject: storageToSubjectMap[storageSubject] || subject,
              type,
              signedUrl,
              size: file.metadata?.size,
              lastModified: file.updated_at || file.created_at
            });
          }
        }
      }

      return resources;

    } catch (error) {
      return [];
    }
  }

  /**
   * Get files based on filters
   */
  async getFilteredFiles(filters: {
    subjects?: string[];
    types?: string[];
    searchQuery?: string;
  }): Promise<ResourceFile[]> {
    try {
      
      const allResources: ResourceFile[] = [];
      const { subjects = [], types = [], searchQuery = '' } = filters;

      // If no subjects or types specified, return empty array
      if (subjects.length === 0 || types.length === 0) {
        return [];
      }

      // Fetch files for each subject/type combination
      for (const subject of subjects) {
        for (const type of types) {
          const files = await this.getFilesForSubjectType(subject, type);
          allResources.push(...files);
        }
      }

      // Apply search filter if specified
      let filteredResources = allResources;
      if (searchQuery.trim()) {
        const query = searchQuery.toLowerCase().trim();
        
        filteredResources = allResources.filter(resource => {
          const nameMatch = resource.name.toLowerCase().includes(query);
          const displayMatch = resource.displayName.toLowerCase().includes(query);
          const subjectMatch = resource.subject.toLowerCase().includes(query);
          const typeMatch = resource.type.toLowerCase().includes(query);
          const unitMatch = resource.unit ? resource.unit.toLowerCase().includes(query) : false;
          
          const matches = nameMatch || displayMatch || subjectMatch || typeMatch || unitMatch;
          
          if (matches) {
          }
          
          return matches;
        });
        
      }

      return filteredResources;

    } catch (error) {
      return [];
    }
  }

  /**
   * Get display name from file name (remove file extension and format)
   */
  private getDisplayName(fileName: string): string {
    // Remove file extension
    const nameWithoutExt = fileName.replace(/\.[^/.]+$/, '');
    
    // Replace underscores and hyphens with spaces
    const formatted = nameWithoutExt.replace(/[_-]/g, ' ');
    
    // Capitalize first letter of each word
    return formatted.replace(/\b\w/g, char => char.toUpperCase());
  }

  /**
   * Clear signed URL cache (useful for testing or if URLs expire)
   */
  clearCache(): void {
    this.signedUrlCache.clear();
  }

  /**
   * Get cache info for debugging
   */
  getCacheInfo(): { size: number; entries: string[] } {
    return {
      size: this.signedUrlCache.size,
      entries: Array.from(this.signedUrlCache.keys())
    };
  }

}

export const storageService = new StorageService();
