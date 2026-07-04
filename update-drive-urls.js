// Script to update Google Drive URLs from download format to viewer format
import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://rbtgopbhokfaxfqlzyhh.supabase.co'
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InJidGdvcGJob2tmYXhmcWx6eWhoIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzYxNzg2MjAsImV4cCI6MjA1MTc1NDYyMH0.H8fNt_8KJ88EcZJg4WjxoFnPNsE7kBNPgQ0xOxrcA7I'

const supabase = createClient(supabaseUrl, supabaseAnonKey)

// Function to convert download URL to viewer URL
function convertToViewerUrl(downloadUrl) {
  try {
    // Extract file ID from download URL
    const fileIdMatch = downloadUrl.match(/[?&]id=([^&]+)/)
    if (fileIdMatch) {
      const fileId = fileIdMatch[1]
      return `https://drive.google.com/file/d/${fileId}/view`
    }
    return null
  } catch (error) {
    console.error('Error converting URL:', error)
    return null
  }
}

async function updateAllUrls() {
  try {
    console.log('🔍 Fetching all resources from database...')
    
    // Get all resources
    const { data: resources, error: fetchError } = await supabase
      .from('resources')
      .select('id, file_name, public_url')
    
    if (fetchError) {
      console.error('❌ Error fetching resources:', fetchError)
      return
    }
    
    console.log(`📊 Found ${resources?.length || 0} resources to update\n`)
    
    let updatedCount = 0
    let errorCount = 0
    
    for (const resource of resources || []) {
      const currentUrl = resource.public_url
      
      // Skip if already in viewer format
      if (currentUrl.includes('/file/d/') && currentUrl.includes('/view')) {
        console.log(`✅ ${resource.file_name} - Already in viewer format`)
        continue
      }
      
      // Convert to viewer URL
      const newUrl = convertToViewerUrl(currentUrl)
      
      if (!newUrl) {
        console.log(`❌ ${resource.file_name} - Could not convert URL`)
        errorCount++
        continue
      }
      
      // Update in database
      const { error: updateError } = await supabase
        .from('resources')
        .update({ public_url: newUrl })
        .eq('id', resource.id)
      
      if (updateError) {
        console.log(`❌ ${resource.file_name} - Update failed:`, updateError.message)
        errorCount++
      } else {
        console.log(`✅ ${resource.file_name} - Updated successfully`)
        console.log(`   Old: ${currentUrl}`)
        console.log(`   New: ${newUrl}`)
        updatedCount++
      }
    }
    
    console.log(`\n📈 Update Summary:`)
    console.log(`✅ Successfully updated: ${updatedCount} URLs`)
    console.log(`❌ Failed updates: ${errorCount} URLs`)
    console.log(`🎉 All URLs are now in viewer format!`)
    
  } catch (err) {
    console.error('💥 Unexpected error:', err)
  }
}

// Run the update
console.log('🚀 Starting Google Drive URL update...\n')
updateAllUrls()