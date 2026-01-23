import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
const supabaseSecretKey = process.env.SUPABASE_SECRET_KEY || '';

function getSupabaseClient() {
  if (!supabaseUrl || !supabaseSecretKey) {
    throw new Error('Missing Supabase configuration. Set NEXT_PUBLIC_SUPABASE_URL and SUPABASE_SECRET_KEY.');
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
  archetype?: any;
  axis_scores?: any;
  industry_analysis?: string; // AI-generated industry insights
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

export interface Lead {
  id: string;
  created_at: string;
  email: string;
  company_name: string;
  website: string;
  linkedin?: string;
  company_insights?: any;
  converted_to_assessment: boolean;
}

export async function saveLead(lead: Omit<Lead, 'id' | 'created_at' | 'converted_to_assessment'>) {
  try {
    const supabase = getSupabaseClient();
    const { data, error } = await supabase
      .from('leads')
      .upsert(
        { ...lead, converted_to_assessment: false },
        { onConflict: 'email' }
      )
      .select();

    if (error) {
      console.error('Error saving lead:', error);
      return { success: false, error: error.message };
    }

    return { success: true, data };
  } catch (err) {
    console.error('Exception saving lead:', err);
    return { success: false, error: String(err) };
  }
}

export async function markLeadConverted(email: string) {
  try {
    const supabase = getSupabaseClient();
    const { error } = await supabase
      .from('leads')
      .update({ converted_to_assessment: true })
      .eq('email', email);

    if (error) {
      console.error('Error marking lead converted:', error);
    }
  } catch (err) {
    console.error('Exception marking lead converted:', err);
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
