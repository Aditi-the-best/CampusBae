// Script to analyze all subjects in your database
import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://rbtgopbhokfaxfqlzyhh.supabase.co'
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InJidGdvcGJob2tmYXhmcWx6eWhoIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzYxNzg2MjAsImV4cCI6MjA1MTc1NDYyMH0.H8fNt_8KJ88EcZJg4WjxoFnPNsE7kBNPgQ0xOxrcA7I'

const supabase = createClient(supabaseUrl, supabaseAnonKey)

async function analyzeSubjects() {
  try {
    console.log('🔍 Analyzing all subjects in database...\n')
    
    const { data, error } = await supabase
      .from('resources')
      .select('file_path')
    
    if (error) {
      console.error('❌ Database error:', error)
      return
    }
    
    // Extract unique subjects from file paths
    const subjects = new Set()
    const types = new Set()
    
    data?.forEach(resource => {
      const pathParts = resource.file_path.split('/')
      if (pathParts.length >= 2) {
        const subject = pathParts[0].trim()
        const type = pathParts[1].trim()
        
        subjects.add(subject)
        types.add(type)
      }
    })
    
    console.log('📚 SUBJECTS found in your database:')
    Array.from(subjects).sort().forEach((subject, index) => {
      console.log(`${index + 1}. "${subject}"`)
    })
    
    console.log('\n📄 TYPES found in your database:')
    Array.from(types).sort().forEach((type, index) => {
      console.log(`${index + 1}. "${type}"`)
    })
    
    console.log(`\nTotal subjects: ${subjects.size}`)
    console.log(`Total types: ${types.size}`)
    
  } catch (err) {
    console.error('💥 Error:', err)
  }
}

analyzeSubjects()