import { Link } from "react-router";
import "./mini-school.css";

interface SchoolFromSupabase {
  id: number;
  shortName: string;
  district: string;
  shortDescription: string;
  slug: string;  
}

interface MiniSchoolProps {
  school: SchoolFromSupabase;
}

export default function MiniSchool({ school }: MiniSchoolProps) {
    return (
        <Link to={`/rating/${school.slug}`} className="mini-school-link" target="_blank">
            <div className="hhl">
                <div className="hh">
                    <h2 className="mini-school_number">№{school.id}</h2>
                    <h2 className="mini-school_headline">{school.shortName}</h2>
                </div>
                <p className="mini-school_location">{school.district}</p>
            </div>
            <p className="mini-school_text">{school.shortDescription}</p>
            <div className="strelka"></div>
        </Link>
    );
}