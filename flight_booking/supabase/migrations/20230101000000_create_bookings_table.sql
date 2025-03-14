-- Create bookings table
CREATE TABLE IF NOT EXISTS bookings (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  flight_id TEXT NOT NULL,
  passenger_details JSONB NOT NULL,
  payment_details JSONB NOT NULL,
  status TEXT NOT NULL,
  total_amount NUMERIC NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Create RLS policies
ALTER TABLE bookings ENABLE ROW LEVEL SECURITY;

-- Policy for users to see only their own bookings
CREATE POLICY "Users can view their own bookings"
  ON bookings
  FOR SELECT
  USING (auth.uid() = user_id);

-- Policy for users to insert their own bookings
CREATE POLICY "Users can insert their own bookings"
  ON bookings
  FOR INSERT
  WITH CHECK (auth.uid() = user_id);

-- Policy for users to update their own bookings
CREATE POLICY "Users can update their own bookings"
  ON bookings
  FOR UPDATE
  USING (auth.uid() = user_id);

-- Create function to set up tables
CREATE OR REPLACE FUNCTION create_bookings_table()
RETURNS void AS $$
BEGIN
  -- Create extension if it doesn't exist
  CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
  
  -- Create bookings table if it doesn't exist
  IF NOT EXISTS (SELECT FROM pg_tables WHERE schemaname = 'public' AND tablename = 'bookings') THEN
    CREATE TABLE bookings (
      id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
      user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
      flight_id TEXT NOT NULL,
      passenger_details JSONB NOT NULL,
      payment_details JSONB NOT NULL,
      status TEXT NOT NULL,
      total_amount NUMERIC NOT NULL,
      created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
      updated_at TIMESTAMP WITH TIME ZONE DEFAULT now()
    );
    
    -- Create RLS policies
    ALTER TABLE bookings ENABLE ROW LEVEL SECURITY;
    
    -- Policy for users to see only their own bookings
    CREATE POLICY "Users can view their own bookings"
      ON bookings
      FOR SELECT
      USING (auth.uid() = user_id);
    
    -- Policy for users to insert their own bookings
    CREATE POLICY "Users can insert their own bookings"
      ON bookings
      FOR INSERT
      WITH CHECK (auth.uid() = user_id);
    
    -- Policy for users to update their own bookings
    CREATE POLICY "Users can update their own bookings"
      ON bookings
      FOR UPDATE
      USING (auth.uid() = user_id);
  END IF;
END;
$$ LANGUAGE plpgsql;

