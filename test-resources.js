// Simple test to check resources table
import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://rbtgopbhokfaxfqlzyhh.supabase.co'
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InJidGdvcGJob2tmYXhmcWx6eWhoIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzYxNzg2MjAsImV4cCI6MjA1MTc1NDYyMH0.H8fNt_8KJ88EcZJg4WjxoFnPNsE7kBNPgQ0xOxrcA7I'

const supabase = createClient(supabaseUrl, supabaseAnonKey)

async function testResources() {
  try {
    console.log('Testing resources table...')
    
    const { data, error } = await supabase
      .from('resources')
      .select('*')
      .limit(5)
    
    if (error) {
      console.error('Error:', error)
      return
    }
    
    console.log('Resources found:', data?.length || 0)
    if (data && data.length > 0) {
      console.log('Sample resource:', data[0])
    }
    
  } catch (err) {
    console.error('Exception:', err)
  }
}

testResources()