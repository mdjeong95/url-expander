// api/expand.js
import fetch from "node-fetch";

export default async function handler(req, res) {
  const target = req.query.url;

  if (!target) {
    return res.status(400).json({ error: "Missing url parameter" });
  }

  try {
    // follow redirects and return final URL
    const response = await fetch(target, {
      method: "GET",
      redirect: "follow"
    });

    const finalUrl = response.url;

    return res.status(200).json({
      original: target,
      expanded: finalUrl
    });
  } catch (e) {
    return res.status(500).json({ error: e.toString() });
  }
}
