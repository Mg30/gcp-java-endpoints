class Navbar {
    constructor(vnode) {
        this.displaySignIn = "block"
        this.displaySignOut = "none"
    }
    onupdate(){
        if(sessionStorage.getItem('token')){
            this.displaySignIn = "none"
            this.displaySignOut = "block"
        }
        m.redraw()
    }
    view () {
        return m("nav.navbar navbar-dark bg-dark", [
            m("a.navbar-brand text-white [href=/home]", { oncreate: m.route.link }, "Home"),
            m("ul.navbar-nav mr-auto", [
                m("li.nav-item dropdown", [
                    m("a.nav-link dropdown-toggle[href= #][role=button][data-toggle=dropdown][aria-haspopup=true][aria-expanded=false][id=navbarDropdown]",
                        "Menu"
                    ),
                    m("div.dropdown-menu[aria-labelledby=navbarDropdown]", [
                        m("a.dropdown-item[href=/add]", { oncreate: m.route.link }, "Ajouter"),
                        m("a.dropdown-item[href=/myPetition]", { oncreate: m.route.link }, "Mes pétitions"),
                        m("a.dropdown-item[href=/top100]", { oncreate: m.route.link }, "TOP 100")
                    ])
                ])
            ]),
            m("button.btn btn-outline-success my-2 my-sm-0", {
                style: `display:${this.displaySignIn}`, onclick: () => {
                    gapi.auth2.getAuthInstance().signIn()
                        .then(() => {
                            this.displaySignIn = "none"
                            let user = gapi.auth2.getAuthInstance().currentUser.get()
                            sessionStorage.setItem('user',user.getBasicProfile().getEmail())
                            sessionStorage.setItem('token',user.getAuthResponse().id_token)
                            this.displaySignOut = "block"
                        })
                        .catch(err => console.log(err))

                }
            }, "SIGN IN"),
            m("button.btn btn-outline-danger", {
                style: `display:${this.displaySignOut}`, onclick: () => {
                    gapi.auth2.getAuthInstance().signOut()
                        .then(() => {
                            this.displaySignIn = "block"
                            this.displaySignOut = "none"
                            sessionStorage.removeItem('user')
                            sessionStorage.removeItem('token')
                            m.route.set('/home')
                        })
                        .catch(err => console.log(err))

                }
            }, "SIGN OUT"),
            
        ])
    }
}