import { Link, useRouteError } from "react-router-dom";
import "./ErrorPage.css";

export default function ErrorPage() {
  const error = useRouteError();
  console.error(error);
  const typeError = error as {
    status?: number;
    message?: string;
    data?: string;
  };

  const errorMessage = typeError.message || typeError.data;
  const errorCode = typeError.status || 500;

  console.error("Error Code:", errorCode);
  console.error("Error Message:", errorMessage);

  return (
    <main className="error_allpage">
      <h1 className="error_title">Error {errorCode}</h1>
      <strong>
        <p className="error_message">{errorMessage}</p>
      </strong>
      <section className="error_image">
        <div className="space-loader">
          <svg
            className="pl"
            viewBox="0 0 160 160"
            width="160px"
            height="160px"
            xmlns="http://www.w3.org/2000/svg"
            aria-labelledby="direction"
          >
            <title id="spaceLoaderTitle">Loading Animation</title>
            <defs>
              <linearGradient id="grad" x1={0} y1={0} x2={0} y2={1}>
                <stop offset="0%" stopColor="#000" />
                <stop offset="100%" stopColor="#fff" />
              </linearGradient>
              <mask id="mask1">
                <rect x={0} y={0} width={160} height={160} fill="url(#grad)" />
              </mask>
              <mask id="mask2">
                <rect
                  x={28}
                  y={28}
                  width={104}
                  height={104}
                  fill="url(#grad)"
                />
              </mask>
            </defs>
            <g>
              <g className="pl__ring-rotate">
                <circle
                  className="pl__ring-stroke"
                  cx={80}
                  cy={80}
                  r={72}
                  fill="none"
                  stroke="hsl(7, 78.50%, 25.50%)"
                  strokeWidth={16}
                  strokeDasharray="452.39 452.39"
                  strokeDashoffset={452}
                  strokeLinecap="round"
                  transform="rotate(-45,80,80)"
                />
              </g>
            </g>
            <g mask="url(#mask1)">
              <g className="pl__ring-rotate">
                <circle
                  className="pl__ring-stroke"
                  cx={80}
                  cy={80}
                  r={72}
                  fill="none"
                  stroke="hsl(0, 77.20%, 44.70%)"
                  strokeWidth={16}
                  strokeDasharray="452.39 452.39"
                  strokeDashoffset={452}
                  strokeLinecap="round"
                  transform="rotate(-45,80,80)"
                />
              </g>
            </g>
            <g>
              <g
                strokeWidth={4}
                strokeDasharray="12 12"
                strokeDashoffset={12}
                strokeLinecap="round"
                transform="translate(80,80)"
              >
                <polyline
                  className="pl__tick"
                  stroke="hsl(223,10%,90%)"
                  points="0,2 0,14"
                  transform="rotate(-135,0,0) translate(0,40)"
                />
                <polyline
                  className="pl__tick"
                  stroke="hsl(223,10%,90%)"
                  points="0,2 0,14"
                  transform="rotate(-90,0,0) translate(0,40)"
                />
                <polyline
                  className="pl__tick"
                  stroke="hsl(223,10%,90%)"
                  points="0,2 0,14"
                  transform="rotate(-45,0,0) translate(0,40)"
                />
                <polyline
                  className="pl__tick"
                  stroke="hsl(223,10%,90%)"
                  points="0,2 0,14"
                  transform="rotate(0,0,0) translate(0,40)"
                />
                <polyline
                  className="pl__tick"
                  stroke="hsl(223,10%,90%)"
                  points="0,2 0,14"
                  transform="rotate(45,0,0) translate(0,40)"
                />
                <polyline
                  className="pl__tick"
                  stroke="hsl(223,10%,90%)"
                  points="0,2 0,14"
                  transform="rotate(90,0,0) translate(0,40)"
                />
                <polyline
                  className="pl__tick"
                  stroke="hsl(223,10%,90%)"
                  points="0,2 0,14"
                  transform="rotate(135,0,0) translate(0,40)"
                />
                <polyline
                  className="pl__tick"
                  stroke="hsl(223,10%,90%)"
                  points="0,2 0,14"
                  transform="rotate(180,0,0) translate(0,40)"
                />
              </g>
            </g>
            <g mask="url(#mask1)">
              <g
                strokeWidth={4}
                strokeDasharray="12 12"
                strokeDashoffset={12}
                strokeLinecap="round"
                transform="translate(80,80)"
              >
                <polyline
                  className="pl__tick"
                  stroke="hsl(123, 87.60%, 38.00%)"
                  points="0,2 0,14"
                  transform="rotate(-135,0,0) translate(0,40)"
                />
                <polyline
                  className="pl__tick"
                  stroke="hsl(123,90%,80%)"
                  points="0,2 0,14"
                  transform="rotate(-90,0,0) translate(0,40)"
                />
                <polyline
                  className="pl__tick"
                  stroke="hsl(123,90%,80%)"
                  points="0,2 0,14"
                  transform="rotate(-45,0,0) translate(0,40)"
                />
                <polyline
                  className="pl__tick"
                  stroke="hsl(123,90%,80%)"
                  points="0,2 0,14"
                  transform="rotate(0,0,0) translate(0,40)"
                />
                <polyline
                  className="pl__tick"
                  stroke="hsl(123,90%,80%)"
                  points="0,2 0,14"
                  transform="rotate(45,0,0) translate(0,40)"
                />
                <polyline
                  className="pl__tick"
                  stroke="hsl(123,90%,80%)"
                  points="0,2 0,14"
                  transform="rotate(90,0,0) translate(0,40)"
                />
                <polyline
                  className="pl__tick"
                  stroke="hsl(123,90%,80%)"
                  points="0,2 0,14"
                  transform="rotate(135,0,0) translate(0,40)"
                />
                <polyline
                  className="pl__tick"
                  stroke="hsl(123,90%,80%)"
                  points="0,2 0,14"
                  transform="rotate(180,0,0) translate(0,40)"
                />
              </g>
            </g>
            <g>
              <g transform="translate(64,28)">
                <g className="pl__arrows" transform="rotate(45,16,52)">
                  <path
                    fill="hsl(3,90%,55%)"
                    d="M17.998,1.506l13.892,43.594c.455,1.426-.56,2.899-1.998,2.899H2.108c-1.437,0-2.452-1.473-1.998-2.899L14.002,1.506c.64-2.008,3.356-2.008,3.996,0Z"
                  />
                  <path
                    fill="hsl(125, 80.00%, 27.50%)"
                    d="M14.009,102.499L.109,58.889c-.453-1.421,.559-2.889,1.991-2.889H29.899c1.433,0,2.444,1.468,1.991,2.889l-13.899,43.61c-.638,2.001-3.345,2.001-3.983,0Z"
                  />
                </g>
              </g>
            </g>
            <g mask="url(#mask2)">
              <g transform="translate(64,28)">
                <g className="pl__arrows" transform="rotate(45,16,52)">
                  <path
                    fill="hsl(333,90%,55%)"
                    d="M17.998,1.506l13.892,43.594c.455,1.426-.56,2.899-1.998,2.899H2.108c-1.437,0-2.452-1.473-1.998-2.899L14.002,1.506c.64-2.008,3.356-2.008,3.996,0Z"
                  />
                  <path
                    fill="hsl(140, 61.30%, 47.60%)"
                    d="M14.009,102.499L.109,58.889c-.453-1.421,.559-2.889,1.991-2.889H29.899c1.433,0,2.444,1.468,1.991,2.889l-13.899,43.61c-.638,2.001-3.345,2.001-3.983,0Z"
                  />
                </g>
              </g>
            </g>
          </svg>
        </div>
      </section>
      <Link to="/" className="colored-box">
        <strong>Retour à la page d'accueil</strong>
      </Link>
    </main>
  );
}
