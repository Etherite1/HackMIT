import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

export default defineSchema({
  messages: defineTable({
    author: v.string(),
    body: v.string(),
  }),
  // answered: defineTable( {
  //   liker: v.string(),
  //   messageId: v.id("messages"), //id of question
  // }).index("byMessageId", ["messageId"]),
  users: defineTable({
    // userId: v.id("messages"),        
    correctAnswers: v.number(), 
    incorrectAnswers: v.number(), 
  })
  // .index("byUserId", ["userId"]),
});
