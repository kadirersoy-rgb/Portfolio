import test from "node:test";
import assert from "node:assert/strict";
import { contexts, experiences, skills, getSkills, getExperiences, getSkillGroups } from "./skillsData.js";

test("categories cover every filtered technology once and omit empty groups", () => {
  for (const filter of ["all", ...Object.keys(contexts)]) {
    const groups = getSkillGroups(filter);
    assert.ok(groups.every((group) => group.skills.length > 0));
    const ids = groups.flatMap((group) => group.skills.map((skill) => skill.id));
    assert.equal(new Set(ids).size, ids.length);
    assert.deepEqual(ids.toSorted(), getSkills(filter).map((skill) => skill.id).toSorted());
  }
});

test("each technology and experience has a unique, valid association", () => {
  const ids = new Set(skills.map((skill) => skill.id));
  assert.equal(ids.size, skills.length);
  assert.equal(new Set(experiences.map((experience) => experience.id)).size, experiences.length);
  for (const experience of experiences) {
    assert.ok(contexts[experience.context]);
    for (const id of experience.skills) assert.ok(ids.has(id), id);
  }
  for (const skill of skills) assert.ok(skill.experiences.length > 0, skill.name);
});

test("context filters keep card counts and detail experiences consistent", () => {
  assert.equal(getSkills("all").length, skills.length);
  for (const context of Object.keys(contexts)) {
    for (const skill of getSkills(context)) {
      const matches = getExperiences(skill, context);
      assert.ok(matches.length > 0);
      assert.ok(matches.every((experience) => experience.context === context));
    }
  }
  const csharp = skills.find((skill) => skill.id === "csharp");
  assert.equal(getExperiences(csharp, "all").length, 4);
  assert.deepEqual(getExperiences(csharp, "academic").map((experience) => experience.id), ["unity", "invaders"]);
  assert.equal(getExperiences(csharp, "enterprise").length, 2);
});

test("learning status and limited project information remain explicit", () => {
  const cpp = skills.find((skill) => skill.id === "cpp");
  assert.equal(cpp.status, "En apprentissage");
  assert.deepEqual(cpp.contexts, ["academic"]);
  const koragence = experiences.find((experience) => experience.id === "koragence");
  assert.deepEqual(koragence.skills, ["react"]);
  assert.equal(koragence.note, "Plateforme confidentielle");
  assert.deepEqual(experiences.find((experience) => experience.id === "data").skills, ["python"]);
});
