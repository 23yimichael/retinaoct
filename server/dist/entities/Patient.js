"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Patient = void 0;
const type_graphql_1 = require("type-graphql");
const typeorm_1 = require("typeorm");
const Scan_1 = require("./Scan");
const User_1 = require("./User");
let Patient = class Patient extends typeorm_1.BaseEntity {
};
__decorate([
    (0, type_graphql_1.Field)(),
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], Patient.prototype, "id", void 0);
__decorate([
    (0, type_graphql_1.Field)(),
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], Patient.prototype, "mrn", void 0);
__decorate([
    (0, type_graphql_1.Field)(() => type_graphql_1.Int),
    (0, typeorm_1.Column)(),
    __metadata("design:type", Number)
], Patient.prototype, "doctorId", void 0);
__decorate([
    (0, type_graphql_1.Field)(),
    (0, typeorm_1.ManyToOne)(() => User_1.User, (user) => user.patients, { lazy: true }),
    __metadata("design:type", User_1.User)
], Patient.prototype, "doctor", void 0);
__decorate([
    (0, type_graphql_1.Field)({ nullable: true }),
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], Patient.prototype, "notes", void 0);
__decorate([
    (0, type_graphql_1.Field)(() => [Scan_1.Scan]),
    (0, typeorm_1.OneToMany)(() => Scan_1.Scan, (scan) => scan.patient, { lazy: true }),
    __metadata("design:type", Array)
], Patient.prototype, "scans", void 0);
__decorate([
    (0, type_graphql_1.Field)(() => String),
    (0, typeorm_1.CreateDateColumn)(),
    __metadata("design:type", Date)
], Patient.prototype, "createdAt", void 0);
__decorate([
    (0, type_graphql_1.Field)(() => String),
    (0, typeorm_1.UpdateDateColumn)(),
    __metadata("design:type", Date)
], Patient.prototype, "updatedAt", void 0);
__decorate([
    (0, type_graphql_1.Field)(),
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], Patient.prototype, "updatedAtString", void 0);
Patient = __decorate([
    (0, type_graphql_1.ObjectType)(),
    (0, typeorm_1.Entity)()
], Patient);
exports.Patient = Patient;
//# sourceMappingURL=Patient.js.map