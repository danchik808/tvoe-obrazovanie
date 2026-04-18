import "./loading.css";

export default function Loading() {
    return (
        <div className="loading">
            <svg width="100" height="80" viewBox="0 0 86 56" fill="none" xmlns="http://www.w3.org/2000/svg">
                <g clip-path="url(#clip0_85_106)">
                    <path d="M86 0H0V13.0667H86V0Z" fill="#012AE4" />
                    <path d="M65.4347 16.8H20.5652V29.8667H65.4347V16.8Z" fill="#012AE4" />
                    <path d="M82.2608 40.0184C76.9822 45.0852 70.7157 49.1044 63.8188 51.8465C56.9221 54.5887 49.5302 56 42.0651 56C34.6001 56 27.2082 54.5887 20.3115 51.8465C13.4146 49.1044 7.14807 45.0852 1.86951 40.0184L12.4454 29.8667C16.3352 33.6004 20.953 36.5622 26.0351 38.5827C31.1172 40.6034 36.5642 41.6434 42.0651 41.6434C47.5661 41.6434 53.0131 40.6034 58.0952 38.5827C63.1773 36.5622 67.7951 33.6004 71.6848 29.8668L82.2608 40.0184Z" fill="#012AE4" />
                </g>
                <defs>
                    <clipPath id="clip0_85_106">
                        <rect width="86" height="56" fill="white" />
                    </clipPath>
                </defs>
            </svg>

            <h1 className="loading_headline">Прогружаем страницу...</h1>
        </div>
    );
}