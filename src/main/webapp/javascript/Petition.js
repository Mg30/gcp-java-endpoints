class PetitionForm {
    constructor(vnode) {
        this.name = ""
        this.description = ""
        this.displayNameValidation = "none"
        this.displayDescriptionValidation = "none"
    }
    oninit () {
        if (!token) {
            alert("Vous devez SIGN IN")
            m.route.set("/home")
        }
    }
    view () {
        return m("div.container", [
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
                                            url: `${endpoint}addPetition/?access_token=${token}`,
                                            data: { name: this.name, description: this.description, owner: user.getEmail() }
                                        }

                                    ).then((result) => {
                                        console.log(result)
                                        m.route.set('/home')
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
    }
    view () {
        return m("li.list-group-item", [
            m('div.container'), [
                m('div.row', [
                    m('div.col', [
                        m('div', `${this.petition.name}`)
                    ]),
                    m('div.col', [
                        m(this.class, `${this.petition.description}`)
                    ]),
                    m('div.col', [
                        m(this.class, `Signatures : ${this.petition.total}`)
                    ]),
                    m('div.col', [
                        m("button.btn btn-primary", {
                            style: `display:${this.btnDisplay}`,
                            onclick: () => {
                                if (!token) {
                                    alert("Vous devez SIGN IN")
                                }
                                else {

                                    m.request(
                                        {
                                            method: "POST",
                                            url: `${endpoint}signPetition/?access_token=${token}`,
                                            data: { petitionName: this.petition.name, userName: user.getEmail() }
                                        })
                                        .then(
                                            () => {
                                                alert("Petition signée ! Merci d'avoir participé")
                                                this.btnDisplay = "none"
                                            }
                                        )
                                        .catch(
                                            () => {
                                                alert("Vous avez déjà signé !")
                                            }
                                        )

                                }

                            }
                        }
                            ,
                            "Signer"
                        )
                    ])

                ])
            ]
        ])
    }
}

class PetitionList {
    constructor(vnode) {
        this.petitions = []
    }
    oninit () {
        m.request({
            method: "GET",
            url: `${endpoint}entitycollection`,
        })
            .then(response => {
                this.petitions = response.items
                console.log(response)
            })
    }
    view () {
        return m("ul.list-group", this.petitions.map(petition => {
            return m(Petition, { data: petition.properties })
        }))
    }
}