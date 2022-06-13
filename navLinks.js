const routes = [
    { href: "/jerseys", title: "Jerseys" },
    { href: "/reviews", title: "Reviews" },
    { href: "/logout", title: "Logout" },
];

const authRoutes = [
    { href: "/login", title: "Login" },
    { href: "/register", title: "Register" },
];

let navLinks = async function navLinks(req, res, next) {
    if (req.session.currentUser) {
        res.locals.routes = routes;
    } else {
        res.locals.routes = authRoutes;
    }
    next();
};

module.exports = navLinks;