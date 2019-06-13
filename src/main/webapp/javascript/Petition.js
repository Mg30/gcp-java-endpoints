class PetitionForm {
    constructor(vnode) {
        this.name = ""
        this.description = ""
        this.displayNameValidation = "none"
        this.displayDescriptionValidation = "none"
        this.header = ""
        this.body = ""
        this.id = "modalForm"
    }
    oninit () {
        if (!sessionStorage.getItem('token')) {
            m.route.set("/home")
            alert("Vous devez SIGN IN")
        }
    }
    view () {
        return m("div.container", [
            m(MyModale, { id: this.id, header: this.header, body: this.body, }),
            m("div.row justify-content-center"), [
                m("div.col-sm-6", [
                    m("form", [
                        m("div.form-group", [
                            m("label", { for: "nameInput" }, "Nom de la pétition"),
                            m("input.form-control", {
                                id: "nameInput", placeholder: "nom", oninput: (e) => {
                                    this.name = e.target.value
                                    this.displayNameValidation = "none"

                                }
                            }),
                            m("div.invalid-feedback", { style: `display:${this.displayNameValidation}` }, "Nom obligatoire")
                        ]),
                        m("div.form-group", [
                            m("label", { for: "descripInput" }, "Description"),
                            m("textarea.form-control", {
                                id: "descripInput", placeholder: "description", oninput: (e) => {
                                    this.description = e.target.value
                                    this.displayDescriptionValidation = "none"
                                }
                            }),
                            m("div.invalid-feedback", { style: `display:${this.displayDescriptionValidation}` }, "Description obligatoire")

                        ]),
                        m("button.btn btn-primary", {
                            onclick: (e) => {
                                e.preventDefault()

                                if (!this.name) {
                                    this.displayNameValidation = "block"
                                }
                                if (!this.description) {
                                    this.displayDescriptionValidation = "block"
                                }

                                if (this.name && this.description) {
                                    m.request(
                                        {
                                            method: "POST",
                                            url: `${endpoint}add/?access_token=${sessionStorage.getItem('token')}`,
                                            data: { name: this.name, description: this.description, owner: sessionStorage.getItem('user') }
                                        }

                                    ).then((result) => {
                                        this.header = "Petition Ajoutée"
                                        this.body = "Redirection vers la page d'acceuil.."
                                        $(`#${this.id}`).modal('show')
                                        setTimeout(() => {
                                            $(`#${this.id}`).modal('hide')
                                            m.route.set('/home')
                                        }
                                            , 2000)
                                    }
                                    )
                                        .catch(err => console.log(err))

                                }


                            }
                        }, "sauvegarder")
                    ]

                    )

                ])
            ]
        ])



    }

}
class Petition {
    constructor(vnode) {
        this.petition = vnode.attrs.data
        this.btnDisplay = vnode.attrs.display
        this.class = "p.text-center"
        this.header = ""
        this.body = ""
        this.id = `${this.petition.name}`
    }
    onupdate (vnode){
        this.petition = vnode.attrs.data
    }
    view () {
        return m('div.container mb-5', [
            m(MyModale, { id: this.id, header: this.header, body: this.body, }),
            m("div.card", [
                m("div.card-header", [
                    m("p.text-left", `${this.petition.total} signatures`),
                    m("p.text-right", `${sessionStorage.getItem('user') === null ? '' : this.petition.owner === sessionStorage.getItem('user') ? "Propriétaire" : ""}`)
                ]),
                m("div.card-body", [
                    m("h5.card-title", this.petition.name),
                    m("p.card-text", this.petition.description),
                    m("button.btn btn-primary", {
                        style: `display:${this.btnDisplay}`,
                        onclick: () => {
                            if (!sessionStorage.getItem('token')) {
                                this.header = "Oups"
                                this.body = "Vous devez vous authentifier pour signer"
                                $(`#${this.id}`).modal('show')
                            }
                            else {
                                m.request(
                                    {
                                        method: "POST",
                                        url: `${endpoint}sign/?access_token=${sessionStorage.getItem('token')}`,
                                        data: { petitionName: this.petition.name, userName: sessionStorage.getItem('user') }
                                    })
                                    .then(
                                        response => {
                                            this.header = "Petition signée"
                                            this.body = "Merci d'avoir participé"
                                            this.petition = response.properties
                                            this.btnDisplay = "none"
                                            console.log(response)
                                            $(`#${this.id}`).modal('show')
                                        }
                                    )
                                    .catch(
                                        (err) => {
                                            this.header = "Oups"
                                            this.body = "Vous avez déjà signé cette petition"
                                            $(`#${this.id}`).modal('show')
                                            console.log(err)
                                        }
                                    )

                            }

                        }
                    },
                        "Signer"
                    ),
                ])
            ])
        ])
    }
}

class PetitionList {
    constructor(vnode) {
        this.petitions
        this.route
        this.title
        this.method
        this.nbpages
        this.numberperpage = 20
        this.petitionsSliced = []
        this.start
        this.end
    }
    oninit (vnode) {
        this.petitions = []
        this.title = vnode.attrs.title
        this.method = vnode.attrs.method
        this.route = vnode.attrs.route
        this.start = 0
        this.end = this.numberperpage
        m.request({
            method: 'GET',
            url: `${endpoint}${this.route}`
        })
            .then(
                response => {
                    this.petitions = response.items
                    this.nbpages = parseInt(this.petitions.length/this.numberperpage)
                    this.petitionsSliced = this.petitions.slice(this.start, this.end)
                    console.log("initialisation")
                }
            )
    }
    onupdate(){
        this.petitionsSliced = this.petitions.slice(this.start,this.end)
    }
    view () {
        return m("div", [
            m("h4.mb-5", this.title),
            m("div", this.petitionsSliced.map(petition => {
                return m(Petition, { data: petition.properties, display:'block'})
            })),
            m("nav[aria-label=...]",[
                m("ul.pagination",[...Array(6).keys()].slice(1).map(nb=>{
                    return m("li.page-item",m("a.page-link[href=#]",{
                        onclick: ()=>{
                            this.end = nb*this.numberperpage
                            this.start = (this.end - this.numberperpage)
                            this.petitionsSliced = this.petitions.slice(this.start,this.end)
                        }
                    },nb))
                }))
            ])
        ])
    }
}


class MyPetition {
    constructor(vnode) {
        this.petitions
        this.route
        this.title
    }
    oninit (vnode) {
        this.petitions = []
        this.title = vnode.attrs.title
        this.method = vnode.attrs.method
        this.route = vnode.attrs.route
        if (!sessionStorage.getItem('token')) {
            m.route.set("/home")
            alert("Vous devez SIGN IN")
        }
        m.request({
            method: this.method,
            url: `${endpoint}${this.route}`,
            data: { userName: sessionStorage.getItem('user') }
        })
            .then(
                response => {
                    this.petitions = response.items
                }
            )
    }
    view () {
        return m("div", [
            m("h4.mb-5", this.title),
            m("div", this.petitions.map(petition => {
                return m(Petition, { data: petition.properties, display:'none'})
            })),
        ])
    }

}