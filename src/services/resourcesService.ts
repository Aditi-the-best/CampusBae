import { supabase } from '../lib/supabaseClient';

export interface ResourceFromDB {
  id: string;
  file_name: string;
  file_path: string;
  public_url: string;
  created_at: string;
}

export interface ProcessedResource {
  id: string;
  name: string;
  displayName: string;
  fullPath: string;
  subject: string;
  type: string;
  unit?: string;
  publicUrl: string;
  size?: number;
  lastModified: string;
}

// Subject mapping from storage names to display names
const storageToSubjectMap: { [key: string]: string } = {
  // Database folder name -> Frontend display name (exact match from subjectMapping.ts)
  
  // Mathematics subjects
  'calculus 1': 'Calculus I - CAL1 (BAS 105)',
  'calculus_1': 'Calculus I - CAL1 (BAS 105)', // underscore version from database
  'Calculus 1': 'Calculus I - CAL1 (BAS 105)', // capitalized version
  'calculus1': 'Calculus I - CAL1 (BAS 105)',  // no space version
  'Calculus1': 'Calculus I - CAL1 (BAS 105)',  // capitalized no space
  'calculus 2': 'Calculus II - CAL2 (BAS 106)',
  'calculus_2': 'Calculus II - CAL2 (BAS 106)', // underscore version from database
  'Calculus 2': 'Calculus II - CAL2 (BAS 106)',
  'calculus2': 'Calculus II - CAL2 (BAS 106)',
  'Calculus2': 'Calculus II - CAL2 (BAS 106)',
  'CAL1': 'Calculus I - CAL1 (BAS 105)',
  'CAL2': 'Calculus II - CAL2 (BAS 106)',
  'calculus': 'Calculus I - CAL1 (BAS 105)', // fallback mapping
  'Calculus': 'Calculus I - CAL1 (BAS 105)', // capitalized fallback
  'AM': 'Applied Mathematics - AM (BAS 101)',
  'EME': 'Elements of Mechanical Engineering - EME (BMA 106)',
  
  // Physics subjects
  'AP': 'Applied Physics - AP (BAS 102)',
  'PP': 'Programming with Python - PP (BAI 101)', // Note: PP in database might be Python, not Physics
  
  // Programming subjects
  'C': 'Programming with C - C (BCS 101)',
  'PF': 'Programming Fundamentals - PF (BAI 104)',
  'OOPS': 'Object Oriented Programming System - OOPS (BIT 102)',
  'DSA': 'Data Structures and Algorithm (DSA)',
  
  // Engineering subjects
  'BEE': 'Basics of Electrical and Electronics Engineering - BEE (BEC 101)',
  'EW': 'Electronics Workshop - EW (BEC 103)',
  
  // Web & IT subjects  
  'WAD': 'Web Application Development - WAD (BCS 102)',
  'ITW': 'IT Workshop - ITW (BAI 102)',
  'IDS': 'Introduction to Data Science - IDS (BAI 103)',
  'NAS': 'Network Analysis and Synthesis - NAS (BEC 104)',
  
  // Communication & Skills
  'CS': 'Communication Skills - CS (HMC 101)',
  'SSPD': 'Soft Skills and Personality Development - SSPD (HMC 102)',
  'sspd': 'Soft Skills and Personality Development - SSPD (HMC 102)', // lowercase variant
  
  // Sciences
  'EVS': 'Environmental Sciences - EVS (BAS 104)',
  'PS': 'Probability and Statistics - PS (BAS 103)',
  'SS': 'Signals and Systems - SS (BEC 102)',
  
  // Core CS subjects
  'DM': 'Discrete Mathematics (DM)',
  'DBMS': 'Database Management Systems (DBMS)',
  'AI': 'Artificial Intelligence (AI)',
  'SE': 'Software Engineering (SE)',
  'DAA': 'Design and Analysis of Algorithms (DAA)',
  'COA': 'Computer Organization and Architecture (COA)',
  'OS': 'Operating Systems (OS)',
  'CN': 'Computer Networks (CN)',
  'OOP': 'Object-Oriented Programming (OOP)',
  
  // Additional subjects
  'OM': 'Operations Management (OM)',
  'ED': 'Ergonomic Design (ED)',
  'CC': 'Cloud Computing (CC)',
  'SM': 'Statistical Modeling (SM)',
  'DMDW': 'Data Mining and Data Warehouse (DMDW)',
  'ITC': 'Information Theory and Coding (ITC)',
  'DCCN': 'Data Communication and Computer Networks (DCCN)',
  'OST': 'Open Source Technologies (OST)',
  'FD': 'Fundamentals of Devops (FD)',
  'Devops': 'Fundamentals of Devops (FD)',
  'devops': 'Fundamentals of Devops (FD)',
  'OTD': 'Optimization Techniques and Decision Making (OTD)',
  
  // Additional short forms commonly used
  'ST': 'Semiconductor Technology (ST)',
  'MM': 'Measurement and Metrology (MM)',
  'SET': 'Solar Energy Technology (SET)',
  'IWWT': 'Industrial Waste Water Treatment (IWWT)',
  'FADE': 'Fundamental of Analog & Digital Electronics (FADE)',
  
  // ECE subjects
  'NTE': 'Numerical Techniques for Engineers (NTE)',
  'DSD': 'Digital System Design (DSD)',
  'ACS': 'Analog Communication Systems (ACS)',
  'acs': 'Analog Communication Systems (ACS)',
  'ECSW': 'Electronics Circuit Simulation Workshop (ECSW)',
  'AEW': 'Advanced Electronic Workshop (AEW)',
  'AE': 'Analog Electronics (AE)',
  'EFTA': 'Electromagnetic Field Theory & Antenna (EFTA)',
  'DCS': 'Digital Communication Systems (DCS)',
  'EMI': 'Electrical Measurement & Instrumentation (EMI)',
  'EM': 'Electrical Machines (EM)',
  'SA': 'Sensors and Actuators (SA)',
  'ADE': 'Analog & Digital Electronics (ADE)',
  
  // MAE/DMAM subjects
  'PT1': 'Production Technology - I (PT1)',
  'TE1': 'Thermal Engineering - I (TE1)',
  'MDL': 'Machine Drawing Lab (MDL)',
  'DS': 'Data Structures (DS)',
  'RL': 'Robotics Lab (RL)',
  'TE2': 'Thermal Engineering - II (TE2)',
  'PT2': 'Production Technology - II (PT2)',
  'TOM': 'Theory of Machines (TOM)',
  'FMHM': 'Fluid Mechanics and Hydraulic Machines (FMHM)',
  'SOM': 'Strength of Materials (SOM)',
  'LSCM': 'Logistics & Supply Chain Management (LSCM)',
  'RAC': 'Refrigeration and Air-Conditioning (RAC)',
  'IAMR': 'Introduction to Autonomous Mobile Robots (IAMR)',
  'FFLSA': 'Fire Fighting and Life Saving Appliances (FFLSA)',
  'IoTL': 'IoT Lab (IoTL)',
  
  // IoT subjects
  'IOT': 'Introduction to Internet of Things (IOT)',
  'AIoT': 'Advanced IoT and Real World Applications - AIoT',
  
  // Humanities
  'IKS': 'IKS/UHV',
  'UHV': 'IKS/UHV',
  'IKS/UHV': 'IKS/UHV',
  'IKS&UHV': 'IKS/UHV',
  'iks&uhv': 'IKS/UHV'
};

// Reverse mapping for filtering
const subjectToStorageMap: { [key: string]: string } = {};
Object.entries(storageToSubjectMap).forEach(([storage, display]) => {
  subjectToStorageMap[display] = storage;
});

class ResourcesService {
  /**
   * Get all resources from the database
   */
  async getAllResources(): Promise<ResourceFromDB[]> {
    try {
      const { data, error } = await supabase
        .from('resources')
        .select('*')
        .order('file_name', { ascending: true });

      if (error) {
        console.error('Error fetching resources:', error);
        return [];
      }

      // Filter out placeholder files and other unwanted files
      const filteredData = (data || []).filter(resource => {
        const fileName = resource.file_name?.toLowerCase() || '';
        
        // Skip placeholder files
        if (fileName.includes('emptyfolderplaceholder')) {
          return false;
        }
        
        // Skip other common placeholder/system files
        if (fileName.includes('placeholder') || 
            fileName.includes('.ds_store') || 
            fileName.includes('thumbs.db') ||
            fileName.includes('desktop.ini')) {
          return false;
        }
        
        return true;
      });

      return filteredData;
    } catch (error) {
      console.error('Error fetching resources:', error);
      return [];
    }
  }

  /**
   * Process file path to extract subject, type, and unit information
   */
  private processFilePath(filePath: string): {
    subject: string;
    type: string;
    unit?: string;
  } {
    // Remove leading slash if present
    const cleanPath = filePath.replace(/^\/+/, '');
    const pathParts = cleanPath.split('/');

    if (pathParts.length < 2) {
      return { subject: 'Unknown', type: 'Unknown' };
    }

    let storageSubject = pathParts[0];
    let type = pathParts[1];
    let unit: string | undefined;

    // Handle nested IKS/UHV folder structure: IKS/UHV/<type>/...
    if (
      storageSubject?.toLowerCase() === 'iks' &&
      type?.toLowerCase() === 'uhv' &&
      pathParts.length >= 3
    ) {
      storageSubject = 'IKS/UHV';
      type = pathParts[2];
      if (pathParts.length > 4 && (type === 'notes' || type === 'pyqs')) {
        unit = pathParts[3];
      }
    }

    // Check if there's a unit folder (for notes/pyqs)
    if (!unit && pathParts.length > 3 && (type === 'notes' || type === 'pyqs')) {
      unit = pathParts[2];
    }

    // Map storage subject name to display name (case-insensitive)
    const displaySubject = storageToSubjectMap[storageSubject] || 
                          storageToSubjectMap[storageSubject.toLowerCase()] ||
                          storageToSubjectMap[storageSubject.toUpperCase()] ||
                          storageSubject;

    return {
      subject: displaySubject,
      type: type,
      unit: unit
    };
  }

  /**
   * Convert file name to display name (remove extension, format)
   */
  private getDisplayName(fileName: string): string {
    // Remove file extension
    const nameWithoutExt = fileName.replace(/\.[^/.]+$/, '');
    // Replace underscores and hyphens with spaces, capitalize words
    const formatted = nameWithoutExt
      .replace(/[_-]/g, ' ')
      .replace(/\b\w/g, l => l.toUpperCase());
    return formatted;
  }

  /**
   * Process raw database resources into frontend-compatible format
   */
  private processResources(rawResources: ResourceFromDB[]): ProcessedResource[] {
    return rawResources.map(resource => {
      const pathInfo = this.processFilePath(resource.file_path);
      
      return {
        id: resource.id,
        name: resource.file_name,
        displayName: this.getDisplayName(resource.file_name),
        fullPath: resource.file_path,
        subject: pathInfo.subject,
        type: pathInfo.type,
        unit: pathInfo.unit,
        publicUrl: resource.public_url,
        lastModified: resource.created_at
      };
    });
  }

  /**
   * Get filtered resources based on subjects, types, and search query
   */
  async getFilteredResources(filters: {
    subjects?: string[];
    types?: string[];
    searchQuery?: string;
  }): Promise<ProcessedResource[]> {
    try {
      const { subjects = [], types = [], searchQuery = '' } = filters;

      console.log('🔍 ResourcesService Debug:', { subjects, types, searchQuery });

      // If no subjects or types specified, return empty array
      if (subjects.length === 0 || types.length === 0) {
        console.log('❌ No subjects or types specified');
        return [];
      }

      // Get all resources from database
      const rawResources = await this.getAllResources();
      console.log(`📚 Found ${rawResources.length} total resources in database`);
      
      // Process them into the format expected by frontend
      const processedResources = this.processResources(rawResources);
      console.log(`✅ Processed ${processedResources.length} resources`);

      // Log first few processed resources to see what subjects we have
      if (processedResources.length > 0) {
        console.log('📋 Sample processed resources:', processedResources.slice(0, 3).map(r => ({
          name: r.name,
          subject: r.subject,
          type: r.type,
          path: r.fullPath
        })));
      }

      // Filter by subjects and types
      let filteredResources = processedResources.filter(resource => {
        const subjectMatch = subjects.includes(resource.subject);
        const typeMatch = types.includes(resource.type);
        
        // Debug log for calculus
        if (resource.subject.toLowerCase().includes('calculus') || resource.fullPath.toLowerCase().includes('calculus')) {
          console.log(`🧮 Calculus resource found:`, {
            name: resource.name,
            subject: resource.subject,
            type: resource.type,
            path: resource.fullPath,
            subjectMatch,
            typeMatch,
            lookingFor: { subjects, types }
          });
        }
        
        return subjectMatch && typeMatch;
      });

      console.log(`🎯 Filtered to ${filteredResources.length} resources after subject/type filter`);

      // Apply search filter if specified
      if (searchQuery.trim()) {
        const query = searchQuery.toLowerCase().trim();
        filteredResources = filteredResources.filter(resource => {
          const nameMatch = resource.name.toLowerCase().includes(query);
          const displayMatch = resource.displayName.toLowerCase().includes(query);
          const subjectMatch = resource.subject.toLowerCase().includes(query);
          const typeMatch = resource.type.toLowerCase().includes(query);
          const unitMatch = resource.unit ? resource.unit.toLowerCase().includes(query) : false;
          
          return nameMatch || displayMatch || subjectMatch || typeMatch || unitMatch;
        });
        
        console.log(`🔍 After search filter: ${filteredResources.length} resources`);
      }

      return filteredResources;

    } catch (error) {
      console.error('Error getting filtered resources:', error);
      return [];
    }
  }

  /**
   * Get resources for specific subjects and types (compatibility with old interface)
   */
  async getFilteredFiles(filters: {
    subjects?: string[];
    types?: string[];
    searchQuery?: string;
  }): Promise<ProcessedResource[]> {
    return this.getFilteredResources(filters);
  }
}

export const resourcesService = new ResourcesService();
export default resourcesService;

