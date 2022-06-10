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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserResolver = void 0;
const argon2_1 = __importDefault(require("argon2"));
const type_graphql_1 = require("type-graphql");
const User_1 = require("../entities/User");
const types_1 = require("../utils/types");
let UserResolver = class UserResolver {
    getUsers() {
        return User_1.User.find();
    }
    async register(email, password, first_name, last_name) {
        if (!email.includes("@")) {
            return {
                error: {
                    field: "Email",
                    message: "Invalid email.",
                },
            };
        }
        if (password.length <= 2) {
            return {
                error: {
                    field: "Password",
                    message: "Password length must be greater than 2 characters.",
                },
            };
        }
        let user;
        try {
            user = await User_1.User.create({
                email,
                password: await argon2_1.default.hash(password),
                first_name,
                last_name,
            }).save();
        }
        catch (e) {
            if (e.detail.includes("already exists")) {
                return {
                    error: {
                        field: "Email",
                        message: "Email already exists.",
                    },
                };
            }
        }
        return { user };
    }
    async login(email, password) {
        const user = await User_1.User.findOne({ where: { email } });
        if (!user) {
            return {
                error: {
                    field: "Email",
                    message: "A user with that email does not exist.",
                },
            };
        }
        const verified = await argon2_1.default.verify(user.password, password);
        if (!verified) {
            return {
                error: {
                    field: "Password",
                    message: "Incorrect password.",
                },
            };
        }
        return { user };
    }
};
__decorate([
    (0, type_graphql_1.Query)(() => [User_1.User]),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], UserResolver.prototype, "getUsers", null);
__decorate([
    (0, type_graphql_1.Mutation)(() => types_1.UserResponse),
    __param(0, (0, type_graphql_1.Arg)("email")),
    __param(1, (0, type_graphql_1.Arg)("password")),
    __param(2, (0, type_graphql_1.Arg)("first_name")),
    __param(3, (0, type_graphql_1.Arg)("last_name")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String, String, String]),
    __metadata("design:returntype", Promise)
], UserResolver.prototype, "register", null);
__decorate([
    (0, type_graphql_1.Mutation)(() => types_1.UserResponse),
    __param(0, (0, type_graphql_1.Arg)("email")),
    __param(1, (0, type_graphql_1.Arg)("password")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String]),
    __metadata("design:returntype", Promise)
], UserResolver.prototype, "login", null);
UserResolver = __decorate([
    (0, type_graphql_1.Resolver)()
], UserResolver);
exports.UserResolver = UserResolver;
//# sourceMappingURL=user.js.map