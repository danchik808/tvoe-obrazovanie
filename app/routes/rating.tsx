import type { Route } from "./+types/rating";
import { useState, useEffect } from 'react';
import Header from "../components/header";
import Footer from "../components/footer";
import MiniSchool from "../components/mini-school";
import "./rating.css";
import { supabase } from "../lib/supabase";

export function meta({ }: Route.MetaArgs) {
    return [
        { title: "Твоё образование | Рейтинг" },
    ];
}

export interface School {
    id: number;
    shortName: string;
    shortDescription: string;
    slug: string;
    district: string;
    available_spots: number;
    profiles: string[];
    key_subjects: string[];
    clubs: string[];
    available_grades: number[];
}

interface Filters {
    search: string;
    district: string;
    hasSpots: boolean;
    profiles: string[];
    subjects: string[];
    grades: number[];
    clubs: string[];
}

export default function Rating() {
    const [visibleCount, setVisibleCount] = useState(10);
    const [allSchools, setAllSchools] = useState<School[]>([]);
    const [filteredSchools, setFilteredSchools] = useState<School[]>([]);
    const [loading, setLoading] = useState(true);
    const [showFilters, setShowFilters] = useState(false);
    const [filters, setFilters] = useState<Filters>({
        search: '',
        district: '',
        hasSpots: false,
        profiles: [],
        subjects: [],
        grades: [],
        clubs: []
    });

    const [districts, setDistricts] = useState<string[]>([]);
    const [allProfiles, setAllProfiles] = useState<string[]>([]);
    const [allSubjects, setAllSubjects] = useState<string[]>([]);
    const [allGrades, setAllGrades] = useState<number[]>([]);
    const [allClubs, setAllClubs] = useState<string[]>([]);

    useEffect(() => {
        async function fetchSchools() {
            try {
                const { data, error } = await supabase
                    .from("schools")
                    .select("id, shortName, shortDescription, slug, district, available_spots, profiles, key_subjects, clubs, available_grades")
                    .order("id", { ascending: true });

                if (!error && data) {
                    setAllSchools(data);
                    setFilteredSchools(data);

                    const uniqueDistricts = [...new Set(data.map(s => s.district).filter(Boolean))];
                    setDistricts(uniqueDistricts);

                    const allProfilesTemp = data.flatMap(s => s.profiles || []);
                    setAllProfiles([...new Set(allProfilesTemp)]);

                    const allSubjectsTemp = data.flatMap(s => s.key_subjects || []);
                    setAllSubjects([...new Set(allSubjectsTemp)]);

                    const allGradesTemp = data.flatMap(s => s.available_grades || []);
                    setAllGrades([...new Set(allGradesTemp)].sort((a, b) => a - b));

                    const allClubsTemp = data.flatMap(s => s.clubs || []);
                    setAllClubs([...new Set(allClubsTemp)]);

                } else if (error) {
                    console.error("Ошибка загрузки школ:", error);
                }
            } catch (err) {
                console.error("Ошибка:", err);
            } finally {
                setLoading(false);
            }
        }

        fetchSchools();
    }, []);

    useEffect(() => {
        let filtered = [...allSchools];

        if (filters.search) {
            filtered = filtered.filter(school =>
                school.shortName.toLowerCase().includes(filters.search.toLowerCase())
            );
        }

        if (filters.district) {
            filtered = filtered.filter(school => school.district === filters.district);
        }

        if (filters.hasSpots) {
            filtered = filtered.filter(school => school.available_spots > 0);
        }

        if (filters.profiles.length > 0) {
            filtered = filtered.filter(school =>
                filters.profiles.some(profile => school.profiles?.includes(profile))
            );
        }

        if (filters.subjects.length > 0) {
            filtered = filtered.filter(school =>
                filters.subjects.some(subject => school.key_subjects?.includes(subject))
            );
        }

        if (filters.grades.length > 0) {
            filtered = filtered.filter(school =>
                filters.grades.some(grade => school.available_grades?.includes(grade))
            );
        }

        if (filters.clubs.length > 0) {
            filtered = filtered.filter(school =>
                filters.clubs.some(club => school.clubs?.includes(club))
            );
        }

        setFilteredSchools(filtered);
        setVisibleCount(10);
    }, [filters, allSchools]);
    const toggleFilters = () => {
        setShowFilters(prev => !prev);
    };
    const visibleSchools = filteredSchools.slice(0, visibleCount);
    const loadMore = () => {
        setVisibleCount(prev => prev + 10);
    };
    const canLoadMore = visibleCount < filteredSchools.length;

    const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFilters({ ...filters, search: e.target.value });
    };
    const handleDistrictChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        setFilters({ ...filters, district: e.target.value });
    };
    const handleHasSpotsChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFilters({ ...filters, hasSpots: e.target.checked });
    };
    const handleProfileToggle = (profile: string) => {
        setFilters(prev => ({
            ...prev,
            profiles: prev.profiles.includes(profile)
                ? prev.profiles.filter(p => p !== profile)
                : [...prev.profiles, profile]
        }));
    };
    const handleSubjectToggle = (subject: string) => {
        setFilters(prev => ({
            ...prev,
            subjects: prev.subjects.includes(subject)
                ? prev.subjects.filter(s => s !== subject)
                : [...prev.subjects, subject]
        }));
    };
    const handleGradeToggle = (grade: number) => {
        setFilters(prev => ({
            ...prev,
            grades: prev.grades.includes(grade)
                ? prev.grades.filter(g => g !== grade)
                : [...prev.grades, grade]
        }));
    };
    const handleClubToggle = (club: string) => {
        setFilters(prev => ({
            ...prev,
            clubs: prev.clubs.includes(club)
                ? prev.clubs.filter(c => c !== club)
                : [...prev.clubs, club]
        }));
    };
    const resetFilters = () => {
        setFilters({
            search: '',
            district: '',
            hasSpots: false,
            profiles: [],
            subjects: [],
            grades: [],
            clubs: []
        });
    };

    if (loading) {
        return (
            <>
                <Header />
                <main className="rating_main">
                    <div className="rating-container">
                        <h2 className="rating_headline">Рейтинг образовательных учреждений</h2>
                        <div className="loading-spinner">Загрузка...</div>
                    </div>
                </main>
                <Footer />
            </>
        );
    }

    return (
        <>
            <Header />
            <main className="rating_main">
                <div className="rating-container">
                    <h2 className="rating_headline">Рейтинг&nbsp;<span className="big-name">образовательных учреждений</span><span className="small-name">школ</span></h2>
                    <button className="filters-up_btn" onClick={toggleFilters}>Фильтры</button>
                    {showFilters && (
                    <div className="filters-section">
                        <div className="filters-row">
                            <div className="filter-group">
                                <label>Поиск по названию:</label>
                                <input type="text" placeholder="Введите название школы..." value={filters.search} onChange={handleSearchChange} />
                            </div>
                            <div className="filter-group">
                                <label>Район:</label>
                                <select value={filters.district} onChange={handleDistrictChange}>
                                    <option value="">Все районы</option>
                                    {districts.map(district => (
                                        <option key={district} value={district}>{district}</option>
                                    ))}
                                </select>
                            </div>
                            <div className="filter-group checkbox">
                                <label>
                                    <input type="checkbox" checked={filters.hasSpots} onChange={handleHasSpotsChange} />
                                    Только школы со свободными местами
                                </label>
                            </div>
                        </div>
                        <div className="filters-row">
                            <div className="filter-group full-width">
                                <label>Профили классов:</label>
                                <div className="checkbox-group">
                                    {allProfiles.map(profile => (
                                        <label key={profile}>
                                            <input type="checkbox" checked={filters.profiles.includes(profile)} onChange={() => handleProfileToggle(profile)} />
                                            {profile}
                                        </label>
                                    ))}
                                </div>
                            </div>
                        </div>
                        <div className="filters-row">
                            <div className="filter-group full-width">
                                <label>Ключевые предметы:</label>
                                <div className="checkbox-group">
                                    {allSubjects.map(subject => (
                                        <label key={subject}>
                                            <input type="checkbox" checked={filters.subjects.includes(subject)} onChange={() => handleSubjectToggle(subject)} />
                                            {subject}
                                        </label>
                                    ))}
                                </div>
                            </div>
                        </div>
                        <div className="filters-row">
                            <div className="filter-group">
                                <label>Классы:</label>
                                <div className="checkbox-group">
                                    {allGrades.map(grade => (
                                        <label key={grade}>
                                            <input type="checkbox" checked={filters.grades.includes(grade)} onChange={() => handleGradeToggle(grade)} />
                                            {grade} класс
                                        </label>
                                    ))}
                                </div>
                            </div>
                        </div>
                        <div className="filters-row">
                            <div className="filter-group full-width">
                                <label>Кружки и секции:</label>
                                <div className="checkbox-group">
                                    {allClubs.map(club => (
                                        <label key={club}>
                                            <input type="checkbox" checked={filters.clubs.includes(club)} onChange={() => handleClubToggle(club)} />
                                            {club}
                                        </label>
                                    ))}
                                </div>
                            </div>
                        </div>
                        <div className="filters-main_buttons">
                            <button className="reset-filters-btn" onClick={toggleFilters}>Скрыть фильтры</button>
                            <button className="reset-filters-btn" onClick={resetFilters}>Сбросить все фильтры</button>
                            <p className="results-count">Найдено школ: {filteredSchools.length}</p>
                        </div>
                    </div>
                    )}
                    <section className="rating">
                        {visibleSchools.length > 0 ? (
                            visibleSchools.map(school => (
                                <MiniSchool key={school.id} school={school} />
                            ))
                        ) : (
                            <div className="no-results">По вашему запросу ничего не найдено</div>
                        )}
                    </section>
                    {canLoadMore && visibleSchools.length > 0 && (
                        <button className="load_button" onClick={loadMore}>
                            Показать ещё ({visibleCount} из {filteredSchools.length})
                        </button>
                    )}
                </div>
            </main>
            <Footer />
        </>
    );
}