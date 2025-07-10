"use server";
import { createClient } from "@/utils/supabase/server";

/**
 * Fetches all available (non-system) schemas in the database using the get_schemas RPC.
 * @returns Array of schema names
 */
export const getSchemas = async (): Promise<string[]> => {
  const supabase = await createClient();
  const { data, error } = await supabase.rpc("get_schemas");
  if (error) throw error;
  // data is an array of schema names
  return data as string[];
};

/**
 * Fetches all tables for a given schema using the get_tables_for_schema RPC.
 * @param schema - The schema name
 * @returns Array of table names
 */
export const getTablesForSchema = async (schema: string): Promise<string[]> => {
  const supabase = await createClient();
  const { data, error } = await supabase.rpc("get_tables_for_schema", {
    schema,
  });

  if (error) throw error;
  // data is an array of table names
  return data as string[];
};
