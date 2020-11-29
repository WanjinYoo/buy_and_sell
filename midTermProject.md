# Buy / Sell

An app where you can put different types of things up for sale. You can pick a specific niche of items to sell for the app (a cars site, a shoes site, etc). This lets buyers find the items they are looking for quickly, and easily contact sellers.

Requirements:
users can see featured items on a main feed
users can filter items by price,
users can favourite items to check up on them later
users can send messages to the user that is listing the item
Admins can:

post items, which can be seen by others
remove items from the site
mark items as SOLD!,
send a message via app, email, or text back on negotiations in buying the said item

Story:
1. As a user, I can browse thru the list of items
2. As a user, I can search specific items on:
   1. Price
      1. Min
      2. Max
   2. Location - stretch
   3. Date added - stretch
   4. Condition of Item: stretch
      1. new
      2. used
3. As a user I can create a favourites list
4. As a user I can send messages to the seller


5. As an Admin - I can add to the list of items (create items)
6. As an admin - I can remove items (Delete)
7. As an Admin - I can mark items as SOLD (update and don't show in main list)
8. As an Admin - 
   1. I can message to seller/buyer
   2. I can text back seller/buyer(SMS) -stretch
   3. I can email to seller/buyer - stretch
        on negotiations to purchase the item. stretch
9. As an Admin - I can view all messages:
   1.  of buyer with seller
   2.  seller with buyer
   3.  on items


Entities - TABLES
1. Users - seller and buyer both
   1. id PK
   2. name
   3. email
   4. phone
   5. is_admin?
   
2. User/Favourites
   1. id PK
   2. user_id references user(id)
   3. item_id references items(id)
  
3. Items - Electronics
   1. id PK
   2. title
   3. description
   4. thumbnail_photo_url
   6. date_listed
   8. price
   9. number_of_likes (count(item_id) from user_favs)
   10. Sold? Y/N
   11. buyer_id (not FK, but will be populated when marked SOLD)
   12. Deleted? Y/N
   13. Delete_Reason

4.  Conversations - buyer, seller & admin
   14. id PK
   15. from_id References user(id)
   16. to_id References user(id)
   17. item_id
   18. message_date
   19. message

stretch:
# - UI - Flow

Types of Users - Admin(seller) / User (Buyer)

## Buyer Logs in:
1. Main Page
   1. Header / Menu Bar - My Favourites, Conversations, Items List, User Information (Welcome User!, Today's date), Logout
   2. 3 Featured - most liked / random
      1. No scrolling of items
      2. STRETCH - his own favourites - if he has no favourites, show him random/ most liked from list

2. Login / Sign-up / logout - Dead Link. All users for Demo purposes will directly use the route

3. My Favourites
   2. List of all items clicked as favourite - use the Items List (#5) to show only the buyer's favourites.
   3. Should display SOLD if items(sold) = 'true'
      1. should not allow user to message seller for such sold items
   4. Allow buyer to message the seller

4. Conversations
   1. list of all items where buyer has already messaged the seller
   2. clicking the item will re-route to a conversation/id page
      1. list out all the conversation for that particular item Oldest first
      2. allow buyer to continue message to seller
      3. Should not allow any more messaging if items is SOLD / DELETED.

5. Items List
   1. Filter on price
   2. Scroll thru items
   3. select item 
      1. Open Item specific page (#6)
      2. mark / unmark as favourite
   4. Should not allow any activity if items is SOLD / DELETED.

6. Specific Items from the Items List
   1. Message Seller
      1. re-route to conversation/id page (#4.2)
   2. mark / unmark as favourite


## Admin / Seller Logs in: (seller can also be a buyer)
1. Main Page
   1. Header / Menu Bar - Login/Sign-up, Inventory, Conversations, User Information
   2. 3 Featured - most liked / random
      1. No scrolling of items
      2. STRETCH - his own favourites - if he has no favourites, show him ramdo/ most liked from list

2. Login / Sign-up / logout - Dead Link. All users for Demo purposes will directly use the route

3. Inventory (Create Listing / delete / update)
   1. Add a item for sale - opens a new page. ON addition, return back to #3.2
   2. like tiny app - list of all items with 3 buttons (update, delete, conversations/:itemId (#4))

4. Conversations/:itemId
   1. list of all buyers who have already messaged the seller
   2. clicking the buyer will re-route to a conversation/id page
      1. list out all the conversation for that particular item Oldest first
      2. allow admin to continue message to buyer
      3. mark the item as SOLD.

5. Conversations
   1. list of all conversations by Date
   2. clicking the item will re-route to a conversation/id page
      1. list out all the conversation for that particular item Oldest first
      2. allow buyer to continue message to seller
      3. Should not allow any more messaging if items is SOLD / DELETED.