/// <reference types="Cypress"/>

import getParams from '../fixtures/getParams.json'
const key = 'adminadmin'

describe('GET all jobs assignment', () => {
    
    it('Get all jobs', () => {
        cy.request({
            method: 'GET',
            url: '/',
            qs: { key }
        }).then((response) => {
            expect(response.status).equal(200)
            expect(response.body).to.have.property('content')
            expect(response.body.content).to.be.an('array')
            expect(response.body.content.length).to.be.greaterThan(0)
        })
    })

    it('Get by position', () => {
        cy.request({
            method: 'GET',
            url: '/',
            qs: { key, position:'QA'}
        }).then((response) => {
            expect(response.status).to.be.oneOf([200,204])
            if (response.status===200){
                expect(response.body).to.have.property('content')
                response.body.content.forEach((job)=>{
                    expect(job).to.have.property('position')
                    expect(job.position).to.include('QA')
                })
        }
    })
})
    
        it('Get by company', () => {
            cy.request({
                method: 'GET',
                url: '/',
                qs: { key, company:'Apple'}
            }).then((response) => {
                expect(response.status).to.be.oneOf([200,204])
                if (response.status===200){
                    expect(response.body).to.have.property('content')
                    response.body.content.forEach((job)=>{
                        expect(job).to.have.property('company')
                        expect(job.company).to.include('Apple')
                    })
                }
            })
        })
        it('Get by location', () => {
            cy.request({
                method: 'GET',
                url: '/',
                qs: { key, location:'Toronto'}
            }).then((response) => {
                expect(response.status).to.be.oneOf([200,204])
                if (response.status===200){
                    expect(response.body).to.have.property('content')
                    response.body.content.forEach((job)=>{
                        expect(job).to.have.property('location')
                        expect(job.location).to.include('Toronto')
                    })
                }
            })
        })
        it('Get by date', () => {
            cy.request({
                method: 'GET',
                url: '/',
                qs: { key, date:'2020-07-11'}
            }).then((response) => {
                expect(response.status).to.be.oneOf([200,204])
                if (response.status===200){
                    expect(response.body).to.have.property('content')
                    response.body.content.forEach((job)=>{
                        expect(job).to.have.property('date')
                        expect(job.date).to.include('2020-07-11')
                    })
                }
            })
})
        it('Get by location +position', () => {
            cy.request({
                method: 'GET',
                url: '/',
                qs: { key, location: "Toronto",position:'QA'}
            }).then((response) => {
                expect(response.status).to.be.oneOf([200,204])
                if (response.status===200){
                    expect(response.body).to.have.property('content')
                    response.body.content.forEach((job)=>{
                        expect(job.location).to.include('Toronto')
                        expect(job.position).to.include('QA')
                    })
                }
            })
        })
        it('Get by location +position+ date', () => {
            cy.request({
                method: 'GET',
                url: '/',
                qs: { key, location: "Toronto",position:'QA', date: '2020-07-11'}
            }).then((response) => {
                expect(response.status).to.be.oneOf([200,204])
                if (response.status===200){
                    expect(response.body).to.have.property('content')
                    
                }
            })
        })})
    
        describe ('GET jobs Negative/ Error messages', () => {
            const key = 'adminadmin'
            it('Sceurity missing key'), () => {
                cy.request({
                    method: 'GET',
                    url: '/',
                    failOnStatusCode: false,
                    qs: { position:'QA'}
                }).then((response) => {
                    expect(response.status).to.not.equal(200)
                
                })
            }
        
        it('Sceurity wrong key'), () => {
            cy.request({
                method: 'GET',
                url: '/',
                failOnStatusCode: false,
                qs: { key:'WRONG KEY',position:'QA'}
            }).then((response) => {
                expect(response.status).to.not.equal(200)
            
            })
        }
    
    it('Wrong endpoint, jobs (no S)', () => {
        cy.request({
            method: 'GET',
            url: '/job',
            failOnStatusCode: false,
            qs: { location:'Toronto'}
        }).then((response) => {
            expect(response.status).equal(404)
            expect(response.status).to.have.property('status',404)
            expect(response.status).to.have.property('error')
        })
    })
})
