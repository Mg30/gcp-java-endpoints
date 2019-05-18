class Navbar {
    constructor(vnode) {
    }
    view () {
        return m("nav.navbar navbar-dark bg-dark", [
            m("a.navbar-brand text-white [href=/home]", { oncreate: m.route.link }, "Home"),
            m("ul.navbar-nav mr-auto",[
                m("li.nav-item dropdown",[
                    m("a.nav-link dropdown-toggle[href= #][role=button][data-toggle=dropdown][aria-haspopup=true][aria-expanded=false][id=navbarDropdown]",
                    "Menu"
                    ),
                    m("div.dropdown-menu[aria-labelledby=navbarDropdown]",[
                        m("a.dropdown-item[href=/add]",{ oncreate: m.route.link }, "Ajouter")
                    ]) 
                ])
            ])
        ])
    }
}


class Footer{
    constructor(vnode){

    }
    view(){
        return m("footer.footer",[
            m("nav.navbar navbar-dark bg-dark")])
    }
}