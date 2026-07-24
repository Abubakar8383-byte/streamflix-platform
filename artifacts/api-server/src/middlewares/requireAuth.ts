import type { Request, Response, NextFunction } from "express";

export function requireAuth(req: Request, res: Response, next: NextFunction): void {
  if (!req.session.userId) {
    res.status(401).json({ error: "Authentication required." });
    return;
  }
  next();
}

export function requireProfile(req: Request, res: Response, next: NextFunction): void {
  if (!req.session.userId) {
    res.status(401).json({ error: "Authentication required." });
    return;
  }
  if (!req.session.profileId) {
    res.status(400).json({ error: "No profile selected. Please select a profile first." });
    return;
  }
  next();
}
