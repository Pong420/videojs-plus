import { registerPlugin } from "video.js";
import "./QualityItem.Hls";

const qualityLevels = require("videojs-contrib-quality-levels");

registerPlugin("qualityLevels", qualityLevels);
