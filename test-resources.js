// Simple test to check resources table
import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://wjrkwynlxmgnqscaauij.supabase.co'
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Indqcmt3eW5seG1nbnFzY2FhdWlqIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTcyNzQ2MDQsImV4cCI6MjA3Mjg1MDYwNH0.LURW69RIvyVoLi1v0Q9W2rR9hxSR1EPoWw2ZkdyvYQo'

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