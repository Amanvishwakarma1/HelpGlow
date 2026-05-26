import React from 'react';
import { 
  HandHeart, Megaphone, Heart, Users, Puzzle, Flame, 
  BarChart3, Users2, ShieldCheck, FileCheck, Globe, MapPin 
} from 'lucide-react';

export const COLORS = {
  magenta: '#8e2382',
  pink: '#e61e6e',
  orange: '#f37021',
  gold: '#d4af37',
  lightPink: '#fff5f8'
};

export const GET_STATS = (colors) => [
  { icon: <HandHeart size={42} color={colors.pink} />, value: 100, label: "Worth Donations", suffix: " Lakh+" },
  { icon: <Megaphone size={42} color={colors.pink} />, value: 100, label: "Successful Campaigns", suffix: "+" },
  { icon: <Heart size={42} color={colors.pink} />, value: 100, label: "Lives Impacted", suffix: " Lakh+" },
  { icon: <Users size={42} color={colors.pink} />, value: 1, label: "Unique Donors", suffix: " Lakh+" },
];

export const GET_VALUES = (colors) => [
  {
    icon: <Puzzle size={40} color={colors.magenta} />,
    title: "Integrity in everything we do",
    text: "We strive never to take the easy path, but always the honest one. We practice integrity in all our actions."
  },
  {
    icon: <Flame size={40} color={colors.magenta} />,
    title: "Serve with passion",
    text: "We are fiercely committed to our purpose of poverty alleviation with a burning desire to make a difference."
  },
  {
    icon: <BarChart3 size={40} color={colors.magenta} />,
    title: "Focused on scale",
    text: "We stay laser-focused on large-scale impact. If we can't scale it, we park it."
  },
  {
    icon: <Users2 size={40} color={colors.magenta} />,
    title: "Empathy for all",
    text: "We are committed to working together with unconditional respect, freedom, trust and support."
  }
];

export const GET_LEGAL_DETAILS = (colors) => [
  { icon: <ShieldCheck size={24} color={colors.pink} />, label: "CIN Number", val: "U88100UP2025NPL229317" },
  { icon: <Globe size={24} color={colors.pink} />, label: "NGO Darpan ID", val: "UP/2022/0314589" },
  { icon: <FileCheck size={24} color={colors.pink} />, label: "PAN Card", val: "AAICH0991A" },
  { icon: <MapPin size={24} color={colors.pink} />, label: "Registered Address", val: "Kundariya Benipur Varanasi 221307" },
];