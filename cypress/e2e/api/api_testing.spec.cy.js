import { faker } from '@faker-js/faker';

describe('template spec', () => {
    
    it('Get a single user', function() {
        cy.request({
            method: 'GET',
            url: `/api/users/2`
        }).then(response => {
            expect(response.status).to.equal(200)
            expect(response.body.data.id).to.equal(2)
            expect(response.body.data.email).to.equal('janet.weaver@reqres.in')
        })
    })
    it('Single not Found', function() {
        cy.request({
            method: 'GET',
            url: '/api/users/23',
            failOnStatusCode: false
        }).then(response => {
            expect(response.status).to.equal(404)
        })
    })
    it('List Resource', function() {
        cy.request({
            method: 'GET',
            url: '/api/unknown',
        }).then(response =>{
            expect(response.status).to.equal(200)
        })
    })
    it('List Single Resource', function() {
        cy.request({
            method: 'GET',
            url: '/api/unknown/2',
        }).then(response =>{
            expect(response.status).to.equal(200)
            expect(response.body.data.id).to.equal(2)
        })
    })
    it('List single resource not found', function() {
        cy.request({
            method: 'GET',
            url: '/api/unknown/23',
            failOnStatusCode: false
        }).then(response =>{
            expect(response.status).to.equal(404)
        })
    })
    it('Create', function(){
        let name = faker.person.firstName()
        let job = faker.person.jobArea()
        cy.request({
            method: 'POST', 
            url: '/api/users',
            body: {
                "name": name,
                "job": job
            }
        }).then(response =>{
            expect(response.status).to.equal(201)
            expect(response.body.name).to.equal(name)
            expect(response.body.job).to.equal(job)
        })
    })
    it('Delete a user', function(){

        cy.request({
            method: 'POST',
            url: '/api/users',
            body: {
                "name": 'teste',
                "job": 'teste',
            }
        }).then((response) => {
            const id = response.body.id
            cy.wrap(id).as('id')
        })

        cy.get('@id').then((id) =>{
            cy.request({
                method: 'DELETE', 
                url: `/api/users/${id}`
            }).then(response =>{
                expect(response.status).to.equal(204)
            })
        })
    })
   it('Update a user', function(){
        
        cy.request({
            method: 'POST',
            url: '/api/users',
            body: {
                "name": 'teste',
                "job": 'teste',
            }
        }).then((response) => {
            const id = response.body.id
            cy.wrap(id).as('id')
        })

        cy.get('@id').then((id) =>{
            cy.request({
                method: 'PUT', 
                url: `/api/users/${id}`, 
                body: {
                    "name": "morpheus",
                    "job": "zion resident"
                }
            }).then(response =>{
                expect(response.status).to.equal(200)
                expect(response.body.name).to.equal("morpheus")
                expect(response.body.job).to.equal("zion resident")
            })
        })
    })

    it('Register successfull', function(){
        cy.request({
            method: 'POST',
            url: '/api/register',
            body: {
                email: Cypress.env('email'),
                password: Cypress.env('password')
            }
        }).then(response => {
            expect(response.status).to.equal(200)
            expect(response.body.id).to.equal(4)
        })
    })
    it('Register unsuccesfull', function(){
        cy.request({
            method: 'POST',
            url: '/api/register',
            body: {
                email: Cypress.env('email')
            },
            failOnStatusCode: false
        }).then(response =>{
            expect(response.status).to.equal(400)
            expect(response.body.error).to.equal("Missing password")
        })
    })
  })