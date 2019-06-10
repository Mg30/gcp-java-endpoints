class MyModale {
    constructor() {
        this.header 
        this.body 
        this.id 
    }
    onupdate (vnode) {
        this.header = vnode.attrs.header
        this.body = vnode.attrs.body
        this.id = vnode.attrs.id
    }
    view () {
        return m(`div.modal fade[id=${this.id}][tabindex=-1][role=dialog][aria-labelledby=exampleModalLabel][aria-hidden="true"]`, [
            m("div.modal-dialog[role=document]", [
                m("div.modal-content", [
                    m("div.modal-header", [
                        m("h5.modal-title", this.header)
                    ]),
                    m("div.modal-body", this.body),
                    m("div.modal-footer", [
                        m("button.btn btn-secondary", {
                            onclick: () => {
                                $(`#${this.id}`).modal("hide")
                            }
                        },
                            "Fermer"
                        )
                    ])
                ])
            ])
        ])
    }
}

class ButtonModal {
    constructor(vnode) {
        this.modalId = vnode.attrs.modalId
        this.label = vnode.attrs.label

    }
    view () {
        return m(`button.btn btn-primary`, {
            onclick: () => {
                $(`#${this.modalId}`).modal('show')
            },

        }, this.label)
    }

}
