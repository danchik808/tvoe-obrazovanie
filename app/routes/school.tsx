import { useParams } from "react-router";
import { useEffect, useState } from "react";
import { supabase } from "~/lib/supabase"; // путь к твоему supabase клиенту

export default function SchoolPage() {
  const { id } = useParams(); // получаем id из URL
  const [school, setSchool] = useState(null);

  useEffect(() => {
    // Запрос в Supabase по этому id
    supabase.from("schools").select("*").eq("id", id).single()
      .then(({ data }) => setSchool(data));
  }, [id]);

  if (!school) return <div>Загрузка...</div>;

  return (
    <div>
      <h1></h1>
      <p></p>
      <p></p>
    </div>
  );
}