/// <reference types="Cypress"/>

const { result } = require("lodash")



describe('Get Jobs Test', () => {
  it('get all jobs', () => {
    cy.request('/').then((response)=>{
console.log(response),
expect(response.status).equal(200)
expect(response.statusText).equal("OK")
    })
  })
  it('verify jobs result list', () => {
    cy.request('/').then((response)=>{
console.log(response.body.content),
expect(response.body.content).not.empty
    })
  })
  it('job listing not null', () => {
    cy.request('/').then((response)=>{
console.log(response.body.content),
expect(response.body.content[0]).have.property("id"),
expect(response.body.content[0].id).not.null
    })
  })
  it('job listing has all details', () => {
    cy.request('/').then((response)=>{
var result =response.body.content[1]
console.log(result)
expect(result).have.property("id")
expect(result.id).equal("65428d7c3f7d791f7b3e7b62")

expect(result).have.property("position")
expect(result.position).equal("Global Web Designer")

expect(result).have.property("company")
expect(result.company).equal("West, Kautzer and Price")

expect(result).have.property("location")
expect(result.location).equal("New Guiseppe")

expect(result).have.property("seniority")
expect(result.seniority).equal("Liaison")

expect(result).have.property("link")
expect(result.link).contain("https")

expect(result).have.property("description")
expect(result.description).equal("Regional")

expect(result).have.property("time")
expect(result.time).equal("two hours ago")

expect(result).have.property("salary")
expect(result.salary).equal("100k")

expect(result).have.property("date")
expect(result.date).equal("once upon a time")
    
})
})

it('search by location', () => {
  cy.request('/?location=Toronto').then((response)=>{
let resultList = response.body.content
console.log(resultList)
expect(response.status).equal(200)
///loop for checking to make sure all cities on our list are actually Toronto
for(let i=0; i<resultList.length; i++){
  expect(resultList[i].location).equal('Toronto')
}
  })
})
  
})

