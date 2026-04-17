import { useParams } from "react-router";
import { useEffect, useState } from "react";
import { supabase } from "../lib/supabase";
import type { Route } from "./+types/school";

export function meta({ }: Route.MetaArgs) {
  return [
    { title: `` },
  ];
}

interface SchoolFromSupabase {
  id: number;
  shortName: string;
  district: string;
  shortDescription: string;
  slug: string;  
}

export default function SchoolPage() {
  const { slug } = useParams();
  const [school, setSchool] = useState<SchoolFromSupabase | null>(null);

  useEffect(() => {
    supabase.from("schools").select("*").eq("slug", slug).single()
      .then(({ data }) => setSchool(data));
  }, [slug]);
  if (!school) return <div>Загрузка...</div>;

  return (
    <div>
      <h1>{school.shortName}</h1>
      <p>{school.shortDescription}</p>
      <p>{school.district}</p>
    </div>
  );
}