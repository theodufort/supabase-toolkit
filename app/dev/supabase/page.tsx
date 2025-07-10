"use client";
import React, { useEffect, useRef, useState } from "react";
import {
  getSchemas,
  getTablesForSchema,
} from "@/libs/supabase/dev/fetchSchemasAndTables";

export default function SupabasePage() {
  const [schemas, setSchemas] = useState<string[]>([]);
  const [selectedSchema, setSelectedSchema] = useState<string>("public");
  const [tables, setTables] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // 🔄 Cache for schema -> tables
  const tableCacheRef = useRef<{ [schema: string]: string[] }>({});

  // 🔁 Fetch schemas on mount
  useEffect(() => {
    setLoading(true);
    getSchemas()
      .then((schemaList) => {
        setSchemas(schemaList);
        if (schemaList.includes("public")) {
          setSelectedSchema("public");
        } else if (schemaList.length > 0) {
          setSelectedSchema(schemaList[0]);
        }
      })
      .catch((err) => setError(err.message || "Failed to fetch schemas"))
      .finally(() => setLoading(false));
  }, []);

  // 🧠 Caching logic for tables
  useEffect(() => {
    if (!selectedSchema) return;

    // If cached, use it
    if (tableCacheRef.current[selectedSchema]) {
      setTables(tableCacheRef.current[selectedSchema]);
      setLoading(false);
      return;
    }

    // Otherwise fetch and cache
    setLoading(true);
    getTablesForSchema(selectedSchema)
      .then((tableList) => {
        tableCacheRef.current[selectedSchema] = tableList;
        setTables(tableList);
      })
      .catch((err) => setError(err.message || "Failed to fetch tables"))
      .finally(() => setLoading(false));
  }, [selectedSchema]);

  return (
    <div className="min-h-screen w-full flex flex-col items-center py-8 px-2">
      <div className="w-full max-w-xl p-0 flex flex-col items-center">
        <div className="w-full flex flex-col md:flex-row md:items-center md:justify-start gap-2 mb-6">
          <label className="text-base font-medium mb-1 md:mb-0 md:mr-3 whitespace-nowrap">
            Schema toggle:
          </label>
          <div className="flex gap-1">
            {schemas.map((schema) => (
              <button
                key={schema}
                onClick={() => setSelectedSchema(schema)}
                className={`px-4 py-1 rounded border text-sm font-medium transition-colors
                  ${
                    selectedSchema === schema
                      ? "bg-white text-gray-900 dark:bg-[#18191c] dark:text-gray-100 border-gray-300 dark:border-gray-700 hover:bg-gray-100 dark:hover:bg-gray-800"
                      : "bg-gray-200 text-gray-900 border-gray-300 dark:bg-gray-100 dark:text-gray-900 dark:border-gray-100"
                  }
                `}
              >
                {schema}
              </button>
            ))}
          </div>
        </div>
        {error && (
          <div className="text-red-500 text-center py-2 text-sm w-full">
            Error: {error}
          </div>
        )}
        {loading ? (
          <div className="text-center text-gray-700 dark:text-gray-200 py-6 w-full text-sm">
            Loading...
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 w-full">
            {tables.length > 0 ? (
              tables.map((table) => (
                <div
                  key={table}
                  className="bg-white dark:bg-[#232526] border border-gray-300 dark:border-gray-700 rounded min-h-[64px] flex items-center justify-center text-gray-900 dark:text-gray-100 text-base font-semibold hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors cursor-pointer"
                >
                  <span>{table}</span>
                </div>
              ))
            ) : (
              <div className="col-span-1 md:col-span-2 text-center text-gray-700 dark:text-gray-200 text-sm py-6">
                No tables found in this schema
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
