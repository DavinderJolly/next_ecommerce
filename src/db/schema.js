import { pgTable, integer, varchar, index, text, primaryKey} from "drizzle-orm/pg-core";
import { sql } from "drizzle-orm";
import { int } from "drizzle-orm/mysql-core";

export const usersTable = pgTable(
  "users",
  {
    id: integer("id").primaryKey().generatedAlwaysAsIdentity({
      name: "users_id_seq",
      startWith: 1,
      increment: 1,
      minValue: 1,
      maxValue: 2147483647,
      cache: 1,
    }),
    email: varchar("email", { length: 255 }).notNull().unique(),
    password: varchar("password", { length: 255 }),
    name: varchar("name", { length: 255 }).notNull(),
  },
  (user) => [
    index("users_email_unique")
      .on(sql`lower(${user.email})`)
      .with({ fillfactor: "70" }),
  ]
);
export const accountsTable = pgTable(
  "account",
  {
    userId: integer("userId")
      .notNull()
      .references(() => usersTable.id, { onDelete: "cascade" }),
    type: text("type").notNull(),
    provider: text("provider").notNull(),
    providerAccountId: text("providerAccountId").notNull(),
    refresh_token: text("refresh_token"),
    access_token: text("access_token"),
    expires_at: integer("expires_at"),
    token_type: text("token_type"),
    scope: text("scope"),
    id_token: text("id_token"),
    session_state: text("session_state"),
  },
  (account) => [
    {
      compoundKey: primaryKey({
        columns: [account.provider, account.providerAccountId],
      }),
    },
  ]
);

export const productsTable = pgTable("products", {
  id: integer("id").primaryKey().generatedAlwaysAsIdentity({
    name: "products_id_seq",
    startWith: 1,
    increment: 1,
    minValue: 1,
    maxValue: 2147483647,
    cache: 1,
  }),
  name: varchar("name", { length: 255 }).notNull(),
  description: varchar("description", { length: 1000 }).notNull(),
  img_url: varchar("img_url", { length: 1000 }).notNull(),
  price: integer("price").notNull(),
});

export const ordersTable = pgTable("orders", {
  id: integer("id").primaryKey().generatedAlwaysAsIdentity({
    name: "orders_id_seq",
    startWith: 1,
    increment: 1,
    minValue: 1,
    maxValue: 2147483647,
    cache: 1,
  }),
  user_id: integer("user_id")
    .references(() => usersTable.id)
    .notNull(),
  status: varchar("status", { length: 50 }).notNull().default("pending"),
});

export const orderItemsTable = pgTable("order_items", {
  id: integer("id").primaryKey().generatedAlwaysAsIdentity({
    name: "order_items_id_seq",
    startWith: 1,
    increment: 1,
    minValue: 1,
    maxValue: 2147483647,
    cache: 1,
  }),
  order_id: integer("order_id")
    .references(() => ordersTable.id)
    .notNull(),
  product_id: integer("product_id")
    .references(() => productsTable.id)
    .notNull(),
  quantity: integer("quantity").notNull(),
});
