import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.SUPABASE_URL || '';
const supabaseSecretKey = process.env.SUPABASE_SECRET_KEY || '';

function getSupabaseClient() {
  if (!supabaseUrl || !supabaseSecretKey) {
    throw new Error('Missing Supabase configuration. Set SUPABASE_URL and SUPABASE_SECRET_KEY.');
  }

  return createClient(supabaseUrl, supabaseSecretKey);
}

export interface Assessment {
  id: string;
  created_at: string;
  company_name: string;
  website: string;
  linkedin: string;
  email: string;
  dimension_scores: Record<string, number>;
  overall_score: number;
  readiness_level: string;
  blockers: any[];
  recommendations: any[];
  company_insights?: any;
  archetype?: any; // New field
  axis_scores?: any; // New field
}

export async function saveAssessment(assessment: Omit<Assessment, 'id' | 'created_at'>) {
  try {
    const supabase = getSupabaseClient();
    const { data, error } = await supabase
      .from('assessments')
      .insert(assessment)
      .select();

    if (error) {
      console.error('Error saving assessment:', error);
      return { success: false, error: error.message };
    }

    return { success: true, data };
  } catch (err) {
    console.error('Exception saving assessment:', err);
    return { success: false, error: String(err) };
  }
}

export async function getAssessment(id: string) {
  try {
    const supabase = getSupabaseClient();
    const { data, error } = await supabase
      .from('assessments')
      .select('*')
      .eq('id', id)
      .single();

    if (error) {
      console.error('Error fetching assessment:', error);
      return null;
    }

    return data;
  } catch (err) {
    console.error('Exception fetching assessment:', err);
    return null;
  }
}
