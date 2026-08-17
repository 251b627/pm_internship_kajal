/**
 * Recommendation Engine for Student PM Internship Portal
 * Inspired by SIH Problem Statement 34: Understanding student interests/goals to recommend matching opportunities.
 */

export function calculateInternshipMatch(internship, profile) {
  if (!profile) {
    return {
      score: 75,
      reasons: ["Popular opportunity matching general PM interest."],
      matchedSkills: [],
      matchedInterests: [],
      matchedIndustries: []
    };
  }

  let totalScore = 0;
  const reasons = [];

  const userSkills = (profile.skills || []).map(s => s.toLowerCase());
  const userInterests = (profile.interests || []).map(i => i.toLowerCase());
  const userIndustries = (profile.industries || []).map(ind => ind.toLowerCase());
  const userRoles = [
    profile.targetRole,
    ...(profile.preferredRoles || [])
  ].filter(Boolean).map(r => r.toLowerCase());

  // 1. Skill Match (Weight: 35 points)
  const reqSkills = (internship.skills || []).map(s => s.toLowerCase());

  const matchedSkills = (internship.skills || []).filter(s => 
    userSkills.includes(s.toLowerCase())
  );
  const matchedPrefSkills = (internship.preferredSkills || []).filter(s => 
    userSkills.includes(s.toLowerCase())
  );

  let skillScore = 0;
  if (reqSkills.length > 0) {
    const ratio = matchedSkills.length / reqSkills.length;
    skillScore = ratio * 30;
    if (matchedPrefSkills.length > 0) {
      skillScore = Math.min(35, skillScore + 5);
    }
  } else {
    skillScore = 25;
  }
  totalScore += skillScore;

  // 2. Interest & Industry Match (Weight: 25 points)
  let interestScore = 0;
  const jobCategory = (internship.category || "").toLowerCase();
  const jobIndustry = (internship.industry || "").toLowerCase();

  const matchedInterests = [];
  if (userInterests.some(i => jobCategory.includes(i) || i.includes("product"))) {
    interestScore += 15;
    matchedInterests.push(internship.category);
  }

  const matchedIndustries = [];
  if (userIndustries.some(ind => ind === jobIndustry || jobIndustry.includes(ind))) {
    interestScore += 10;
    matchedIndustries.push(internship.industry);
  } else if (userIndustries.length === 0) {
    interestScore += 7;
  }
  totalScore += interestScore;

  // 3. Role Alignment (Weight: 20 points)
  let roleScore = 0;
  const jobTitle = (internship.title || "").toLowerCase();
  const roleMatched = userRoles.some(r => jobTitle.includes(r) || r.includes(jobTitle) || (r.includes("product") && jobTitle.includes("product")));
  
  if (roleMatched) {
    roleScore = 20;
  } else {
    roleScore = 12; // PM adjacent
  }
  totalScore += roleScore;

  // 4. Work Mode & Location (Weight: 10 points)
  let locationScore = 0;
  const userWorkMode = (profile.workMode || "").toLowerCase();
  const jobWorkMode = (internship.workMode || "").toLowerCase();

  if (userWorkMode === "remote" && (jobWorkMode === "remote" || jobWorkMode === "hybrid")) {
    locationScore += 10;
  } else if (userWorkMode === jobWorkMode) {
    locationScore += 10;
  } else {
    locationScore += 6;
  }
  totalScore += locationScore;

  // 5. Experience & Base Alignment (Weight: 10 points)
  let baseScore = 8;
  if (profile.experienceLevel === internship.experienceLevel) {
    baseScore = 10;
  }
  totalScore += baseScore;

  // Normalize final score between 60% and 98%
  const finalScore = Math.min(98, Math.max(62, Math.round(totalScore)));

  // Generate explainable match reasons
  if (matchedSkills.length > 0) {
    reasons.push(`Matches your skills in ${matchedSkills.slice(0, 3).join(", ")}.`);
  }

  if (matchedIndustries.length > 0) {
    reasons.push(`Aligns with your ${matchedIndustries[0]} industry preference.`);
  } else if (matchedInterests.length > 0) {
    reasons.push(`Strong fit for your ${matchedInterests[0]} track.`);
  }

  if (jobWorkMode === "remote" && profile.workMode === "Remote") {
    reasons.push("Matches your 100% remote work preference.");
  } else if (internship.location && (profile.preferredLocations || []).some(loc => internship.location.toLowerCase().includes(loc.toLowerCase()))) {
    reasons.push(`Located in your preferred city (${internship.location.split(",")[0]}).`);
  }

  if (reasons.length === 0) {
    reasons.push("High general match for PM and tech growth tracks.");
  }

  const explanation = `${finalScore}% Match: ${reasons.join(" ")}`;

  return {
    score: finalScore,
    explanation,
    reasons,
    matchedSkills,
    matchedInterests,
    matchedIndustries
  };
}

export function rankInternships(internships, profile) {
  return internships.map(job => {
    const match = calculateInternshipMatch(job, profile);
    return {
      ...job,
      matchScore: match.score,
      matchExplanation: match.explanation,
      matchReasons: match.reasons,
      matchedSkills: match.matchedSkills
    };
  }).sort((a, b) => b.matchScore - a.matchScore);
}
