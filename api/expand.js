export default async function handler(req, res) {
  const target = req.query.url;

  if (!target) {
    return res.status(400).json({ error: "Missing url parameter" });
  }

  try {
    const response = await fetch(target, {
      method: "GET",
      redirect: "follow"
    });

    return res.status(200).json({
      original: target,
      expanded: response.url
    });
  } catch (e) {
    return res.status(500).json({ error: e.toString() });
  }
}
