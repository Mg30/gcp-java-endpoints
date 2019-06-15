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
        this.petition
        this.btnDisplay = vnode.attrs.display
        this.class = "p.text-center"
        this.header = ""
        this.body = ""
        this.id
        this.total = 0
        this.parent 
    }
    view (vnode) {
        this.parent = vnode.attrs.maj
        this.petition = vnode.attrs.data
        this.id = `${this.petition.name}`
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
                                            let pos
                                            this.header = "Petition signée"
                                            this.body = "Merci d'avoir participé"
                                            pos = this.parent.petitions.map(pet=>pet.name).indexOf(response.properties.name)
                                            this.parent.petitions[pos].total = response.properties.total
                                            this.btnDisplay = "none"
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
        this.nbpages = 0
        this.numberperpage = 20
        this.petitionsSliced = []
        this.start
        this.end
        this.petitions = []
    }
    oninit (vnode) {
        this.title = vnode.attrs.title
        this.method = vnode.attrs.method
        this.route = vnode.attrs.route
        this.start = 0
        this.end = this.numberperpage
        m.request({
            method: this.method,
            url: `${endpoint}${this.route}`
        })
            .then(
                response => {
                    this.petitions = response.items.map(pet=>pet.properties)
                    this.nbpages = parseInt((this.petitions.length / this.numberperpage)) + 1
                    this.petitionsSliced = this.petitions.slice(this.start, this.end)
                }
            )
    }
    view (vnode) {
        return m("div", [
            m("h4.mb-5", this.title),
            m("div", this.petitionsSliced.map(petition => {
                return m(Petition, { data: petition, display: 'block', maj: vnode.state})
            })),
            m("nav[aria-label=...]", [
                m("ul.pagination", [...Array(this.nbpages).keys()].slice(1).map(nb => {
                    return m("li.page-item", m("a.page-link", {
                        onclick: () => {
                            this.end = nb * this.numberperpage
                            this.start = (this.end - this.numberperpage)
                            this.petitionsSliced = this.petitions.slice(this.start, this.end)
                        }
                    }, nb))
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
    view (vnode) {
        return m("div", [
            m("h4.mb-5", this.title),
            m("div", this.petitions.map(petition => {
                return m(Petition, { data: petition.properties, display: 'none' })
            })),
        ])
    }

}

class PetitionListAll {
    constructor(vnode) {
        this.route = vnode.attrs.route
        this.method = vnode.attrs.method
        this.key = ""
        this.petitions = []

    }
    oninit (vnode) {
        this.title = vnode.attrs.title
        m.request(
            {
                method: this.method,
                url: `${endpoint}${this.route}`,
                data: { lastKey: this.key }
            }
        )
            .then(
                response => {
                    this.petitions = response.petitions.sort((a, b) => b.properties.total - a.properties.total).map(pet => pet.properties)
                    this.key = this.petitions.slice(-1)[0].name
                }
            )
    }
    view (vnode) {
        return m("div", [
            m("h4.mb-5", this.title),
            m("div.d-flex justify-content-end", [
                m("button.btn btn-outline-success[type=button]", {
                    onclick: () => {
                        m.request({
                            method: this.method,
                            url: `${endpoint}${this.route}`,
                            data: { lastKey: this.key, way: "next" }
                        })
                            .then(response => {
                                this.petitions = response.petitions.sort((a, b) => b.properties.total - a.properties.total).map(pet => pet.properties)
                                this.key = this.petitions.slice(-1)[0].name
                            })


                    }
                }, "Suivant"),


            ]),
            m("div", this.petitions.map(petition => {
                return m(Petition, { data: petition, display: 'block',maj: vnode.state})
            })),
            m("div.d-flex justify-content-start", [
                m("button.btn btn-outline-success[type=button][href=#]", {
                    onclick: () => {
                        m.request({
                            method: this.method,
                            url: `${endpoint}${this.route}`,
                            data: { lastKey: this.key, way: "next" }
                        })
                            .then(response => {
                                this.petitions = response.petitions.sort((a, b) => b.properties.total - a.properties.total).map(pet => pet.properties)
                                this.key = this.petitions.slice(-1)[0].name
                            })


                    }
                }, "Suivant"),
            ])

        ])
    }
}