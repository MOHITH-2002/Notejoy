import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

export default defineSchema({
  documents: defineTable({
    userId: v.string(),
    title: v.string(),
    isPublished:v.boolean(),
    coverImage:v.optional(v.string()),
    parentDocument:v.optional(v.id("documents")),
    icon:v.optional(v.string()),
    isArchived:v.boolean(),
    content: v.optional(v.string()),

  }).index("by_user",["userId"])
  .index("by_parent_user",["userId","parentDocument"])
});