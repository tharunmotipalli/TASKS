import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class extends BaseSchema {
  protected tableName = 'customers'

  public async up () {
    this.schema.createTable(this.tableName, (table) => {
      table.increments("id")
      table.integer('customerid')
      table.string('customername')
      
    })
  }

  public async down () {
    this.schema.dropTable(this.tableName)
  }
}
