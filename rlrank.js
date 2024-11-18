document.getElementById("rank-form").addEventListener("submit", async (event) => {
    event.preventDefault();
  
    const username = document.getElementById("username").value;
    const resultDiv = document.getElementById("rank-result");
    const rank1v1Span = document.getElementById("rank-1v1");
    const rank2v2Span = document.getElementById("rank-2v2");
  
    // Clear previous results and show loading
    rank1v1Span.textContent = "Loading...";
    rank2v2Span.textContent = "Loading...";
    resultDiv.classList.remove("hidden");
  
    try {
      const response = await fetch(`https://public-api.tracker.gg/v2/rocket-league/standard/profile/epic/${username}`, {
        headers: { "TRN-Api-Key": "b20bc696-9077-45d2-ba27-bec700db788e" }
      });
  
      if (!response.ok) throw new Error("User not found");
  
      const data = await response.json();
  
      // Extract 1v1 and 2v2 ranks
      const ranks = data.data.segments.filter(segment => segment.metadata.name === "Ranked Duel 1v1" || segment.metadata.name === "Ranked Doubles 2v2");
  
      const rank1v1 = ranks.find(rank => rank.metadata.name === "Ranked Duel 1v1")?.stats.tier.metadata.name || "Unranked";
      const rank2v2 = ranks.find(rank => rank.metadata.name === "Ranked Doubles 2v2")?.stats.tier.metadata.name || "Unranked";
  
      rank1v1Span.textContent = rank1v1;
      rank2v2Span.textContent = rank2v2;
  
    } catch (error) {
      rank1v1Span.textContent = "Error fetching rank";
      rank2v2Span.textContent = "Error fetching rank";
      console.error("Error:", error);
    }
  });
  