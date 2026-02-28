import { useState, useEffect } from "react";

const SERVER_URL = import.meta.env.VITE_SERVER_URL || "";
const API_BASE = `${SERVER_URL}/api`;
const MAIL_BASE = `${SERVER_URL}/mail`;

export function useFetch(endpoint) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let cancelled = false;
    setLoading(true);
    setError(null);

    fetch(`${API_BASE}/${endpoint}`)
      .then((res) => {
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        return res.json();
      })
      .then((json) => {
        if (!cancelled) {
          setData(json);
          setLoading(false);
        }
      })
      .catch((err) => {
        if (!cancelled) {
          setError(err.message);
          setLoading(false);
        }
      });

    return () => {
      cancelled = true;
    };
  }, [endpoint]);

  return { data, loading, error };
}

export async function postEnquiry(payload) {
  const ts = new Date().toISOString();

  const res = await fetch(`${API_BASE}/enquiries`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ ...payload, createdAt: ts }),
  });

  if (!res.ok) throw new Error(`DB Error: HTTP ${res.status}`);

  try {
    const mailRes = await fetch(`${MAIL_BASE}/send-enquiry`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ ...payload, createdAt: ts }),
    });
    if (!mailRes.ok) console.warn("Mail server error:", await mailRes.text());
  } catch (error) {
    console.warn(
      "Mail sever unreachable (enquiry has been saved):",
      error.message,
    );
  }

  return res.json();
}
