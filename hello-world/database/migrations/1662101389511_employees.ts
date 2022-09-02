import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class extends BaseSchema {
  protected tableName = 'employees'

  public async up () {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id') //creating table with fiellds(id,empname,salary,mobile_no)
      table.string('empname')
      table.integer('salary')
      table.string('mobile_no')
    })
  }

  public async down () {
    this.schema.dropTable(this.tableName)
  }
}
