import { createClient } from '@supabase/supabase-js';

// Initialize Supabase client
const supabaseUrl = process.env.SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseKey) {
  console.warn('Supabase credentials not found. Using mock data instead.');
}

// Create a Supabase client
export const supabase = createClient(
  supabaseUrl || 'https://example.supabase.co',
  supabaseKey || 'mock-key'
);

// Authentication functions
export async function signUp(email, password) {
  const { data, error } = await supabase.auth.signUp({
    email,
    password,
  });
  
  if (error) throw error;
  return data;
}

export async function signIn(email, password) {
  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });
  
  if (error) throw error;
  return data;
}

export async function signOut() {
  const { error } = await supabase.auth.signOut();
  if (error) throw error;
}

export async function getUser(request) {
  const { data: { session } } = await supabase.auth.getSession();
  return session?.user || null;
}

// Photo functions
export async function getPhotos({ userId, limit = 20, offset = 0, tag = null }) {
  let query = supabase
    .from('photos')
    .select('*')
    .eq('userId', userId)
    .order('uploadDate', { ascending: false })
    .range(offset, offset + limit - 1);
  
  if (tag) {
    query = query.contains('tags', [tag]);
  }
  
  const { data, error, count } = await query;
  
  if (error) throw error;
  return { photos: data, total: count };
}

export async function getPhoto(id) {
  const { data, error } = await supabase
    .from('photos')
    .select('*')
    .eq('id', id)
    .single();
  
  if (error) throw error;
  return data;
}

export async function createPhoto({ userId, url, title, description, tags, uploadDate }) {
  const { data, error } = await supabase
    .from('photos')
    .insert([
      { userId, url, title, description, tags, uploadDate }
    ])
    .select()
    .single();
  
  if (error) throw error;
  return data;
}

export async function updatePhoto(id, { title, description, tags }) {
  const { data, error } = await supabase
    .from('photos')
    .update({ title, description, tags })
    .eq('id', id)
    .select()
    .single();
  
  if (error) throw error;
  return data;
}

export async function deletePhoto(id) {
  const { error } = await supabase
    .from('photos')
    .delete()
    .eq('id', id);
  
  if (error) throw error;
  return true;
}

// Gallery settings functions
export async function getGallerySettings(userId) {
  const { data, error } = await supabase
    .from('gallery_settings')
    .select('*')
    .eq('userId', userId)
    .single();
  
  if (error && error.code !== 'PGRST116') throw error;
  
  // Return default settings if none exist
  if (!data) {
    return {
      userId,
      layoutType: 'grid',
      customizationOptions: {
        theme: 'light',
        primaryColor: '#3B82F6',
        showTitles: true,
        showDescriptions: true,
        showTags: true
      }
    };
  }
  
  return data;
}

export async function updateGallerySettings(userId, { layoutType, customizationOptions }) {
  const { data: existingSettings } = await supabase
    .from('gallery_settings')
    .select('*')
    .eq('userId', userId)
    .single();
  
  if (existingSettings) {
    const { data, error } = await supabase
      .from('gallery_settings')
      .update({ layoutType, customizationOptions })
      .eq('userId', userId)
      .select()
      .single();
    
    if (error) throw error;
    return data;
  } else {
    const { data, error } = await supabase
      .from('gallery_settings')
      .insert([
        { userId, layoutType, customizationOptions }
      ])
      .select()
      .single();
    
    if (error) throw error;
    return data;
  }
}

// Subscription functions
export async function getSubscription(userId) {
  const { data, error } = await supabase
    .from('subscriptions')
    .select('*')
    .eq('userId', userId)
    .single();
  
  if (error && error.code !== 'PGRST116') throw error;
  
  // Return free tier if no subscription exists
  if (!data) {
    return {
      userId,
      plan: 'free',
      status: 'active',
      currentPeriodEnd: null
    };
  }
  
  return data;
}

export async function createSubscription(userId, { plan, status, currentPeriodEnd }) {
  const { data, error } = await supabase
    .from('subscriptions')
    .insert([
      { userId, plan, status, currentPeriodEnd }
    ])
    .select()
    .single();
  
  if (error) throw error;
  return data;
}

export async function updateSubscription(userId, { plan, status, currentPeriodEnd }) {
  const { data, error } = await supabase
    .from('subscriptions')
    .update({ plan, status, currentPeriodEnd })
    .eq('userId', userId)
    .select()
    .single();
  
  if (error) throw error;
  return data;
}

// Deployment functions
export async function createDeployment(userId, { platform, domain, status }) {
  const { data, error } = await supabase
    .from('deployments')
    .insert([
      { userId, platform, domain, status, createdAt: new Date().toISOString() }
    ])
    .select()
    .single();
  
  if (error) throw error;
  return data;
}

export async function getDeployment(id) {
  const { data, error } = await supabase
    .from('deployments')
    .select('*')
    .eq('id', id)
    .single();
  
  if (error) throw error;
  return data;
}

export async function updateDeploymentStatus(id, status, completedAt = null) {
  const { data, error } = await supabase
    .from('deployments')
    .update({ status, completedAt })
    .eq('id', id)
    .select()
    .single();
  
  if (error) throw error;
  return data;
}

