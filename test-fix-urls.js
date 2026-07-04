// Script to test and fix Google Drive URLs
import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://rbtgopbhokfaxfqlzyhh.supabase.co'
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InJidGdvcGJob2tmYXhmcWx6eWhoIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzYxNzg2MjAsImV4cCI6MjA1MTc1NDYyMH0.H8fNt_8KJ88EcZJg4WjxoFnPNsE7kBNPgQ0xOxrcA7I'

const supabase = createClient(supabaseUrl, supabaseAnonKey)

// Function to convert Google Drive URL formats
function convertGoogleDriveUrl(url) {
  try {
    // Extract file ID from current URL
    const fileIdMatch = url.match(/[?&]id=([^&]+)/)
    if (fileIdMatch) {
      const fileId = fileIdMatch[1]
      
      // Return different URL formats
      return {
        original: url,
        directDownload: `https://drive.google.com/uc?id=${fileId}&export=download`,
        viewerUrl: `https://drive.google.com/file/d/${fileId}/view`,
        embedUrl: `https://drive.google.com/file/d/${fileId}/preview`
      }
    }
    return { error: 'Could not extract file ID' }
  } catch (error) {
    return { error: error.message }
  }
}

async function testAndFixUrls() {
  try {
    console.log('Testing Google Drive URLs...')
    
    // Get a few resources to test
    const { data, error } = await supabase
      .from('resources')
      .select('id, file_name, public_url')
      .limit(3)
    
    if (error) {
      console.error('Database error:', error)
      return
    }
    
    console.log(`\nTesting ${data?.length} URLs:\n`)
    
    for (const resource of data || []) {
      console.log(`File: ${resource.file_name}`)
      console.log(`Current URL: ${resource.public_url}`)
      
      const converted = convertGoogleDriveUrl(resource.public_url)
      if (converted.error) {
        console.log(`Error: ${converted.error}\n`)
        continue
      }
      
      console.log('Alternative URLs:')
      console.log(`- Direct Download: ${converted.directDownload}`)
      console.log(`- View in Drive: ${converted.viewerUrl}`)
      console.log(`- Preview: ${converted.embedUrl}`)
      console.log(`\n`)
    }
    
    console.log('\n📝 NEXT STEPS:')
    console.log('1. Make sure all Google Drive files are shared as "Anyone with the link can view"')
    console.log('2. Test the URLs above in your browser')
    console.log('3. If direct download doesn\'t work, we can update the database to use viewer URLs')
    
  } catch (err) {
    console.error('Exception:', err)
  }
}

testAndFixUrls()