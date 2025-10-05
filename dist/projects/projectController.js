"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteProject = exports.updateProject = exports.createProject = exports.getProject = exports.getProjects = void 0;
const db_1 = __importDefault(require("../config/db"));
const getProjects = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const projects = yield db_1.default.project.findMany({
        include: { owner: true },
    });
    res.json(projects);
});
exports.getProjects = getProjects;
const getProject = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const project = yield db_1.default.project.findUnique({
        where: { id: req.params.id },
        include: { owner: true },
    });
    if (!project)
        return res.status(404).json({ message: "Project not found" });
    res.json(project);
});
exports.getProject = getProject;
const createProject = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { title, description, liveUrl, repoUrl, thumbnail } = req.body;
    const project = yield db_1.default.project.create({
        data: {
            title,
            description,
            liveUrl,
            repoUrl,
            thumbnail,
            ownerId: req.user.id,
        },
    });
    res.json(project);
});
exports.createProject = createProject;
const updateProject = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { title, description, liveUrl, repoUrl, thumbnail } = req.body;
    const project = yield db_1.default.project.update({
        where: { id: req.params.id },
        data: { title, description, liveUrl, repoUrl, thumbnail },
    });
    res.json(project);
});
exports.updateProject = updateProject;
const deleteProject = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    yield db_1.default.project.delete({ where: { id: req.params.id } });
    res.json({ message: "Project deleted successfully" });
});
exports.deleteProject = deleteProject;
