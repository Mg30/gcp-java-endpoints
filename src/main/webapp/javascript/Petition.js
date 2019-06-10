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
            alert("Vous devez SIGN IN")
            m.route.set("/home")
        }
    }
    onupdate () {
        if (!sessionStorage.getItem('token')) {
            m.route.set('/home')
            alert("Non identifé")
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
                                            url: `${endpoint}addPetition/?access_token=${sessionStorage.getItem('token')}`,
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
        this.btnDisplay = 'block'
        this.class = "p.text-center"
        this.header = ""
        this.body = ""
        this.id = "modalId"
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
                                        url: `${endpoint}signPetition/?access_token=${sessionStorage.getItem('token')}`,
                                        data: { petitionName: this.petition.name, userName: sessionStorage.getItem('user') }
                                    })
                                    .then(
                                        () => {
                                            this.header = "Petition signée"
                                            this.body = "Merci d'avoir participé"
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
        this.petitions = []
        this.route = vnode.attrs.route
        this.auth = vnode.attrs.auth
        this.method = vnode.attrs.method
        this.title = vnode.attrs.title
        this.itemsPerPage = vnode.attrs.itemsPerPage
        this.nbPages = this.petitions.length/this.itemsPerPage
        this.currentPage = 1
        this.paginatedPetitions = []
    }
    oninit () {
        if (this.auth) {
            if (!sessionStorage.getItem('token')) {
                m.route.set('/home')
                alert("Non identifé")
            }
        }
        let req
        if (this.method === "POST") {
            req = {
                method: this.method,
                url: this.auth === true ? `${endpoint}${this.route}?access_token=${sessionStorage.getItem('token')}` : `${endpoint}${this.route}`,
                data: { userName: sessionStorage.getItem('user') }
            }

        }
        else {
            req = {
                method: this.method,
                url: this.auth === true ? `${endpoint}${this.route}?access_token=${sessionStorage.getItem('token')}` : `${endpoint}${this.route}`
            }

        }
        console.log(req)

        m.request(req)
            .then(response => {
                console.log(response)
                this.petitions = response.items
                let start = this.itemsPerPage
                let end = start + this.itemsPerPage + 1
                this.paginatedPetitions = this.petitions.slice(start, end)
            })
            .catch(err => console.log(err))
    }
    onupdate () {
        if (this.auth) {
            if (!sessionStorage.getItem('token')) {
                m.route.set('/home')
                alert("Non identifé")
            }
        }

    }
    view () {
        return m("div", [
            m("h4.mb-5", this.title),
            m("div", this.petitions.map(petition => {
                return m(Petition, { data: petition.properties })
            })),
        ])
    }
}