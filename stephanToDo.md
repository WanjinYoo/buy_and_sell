# SORT BY LIKES, DATE
# ADD MORE LIKSE
# FIX HOW DATES LOOK [X]
# When page is created check if HAS liked so we can change the color of the button so we know what we have liked OR dont diplay liked items?

# CREATE A LISTING
# LOOP ON ITEMS EJS PAGE AND ALSO PASS IN ALL USER FAVS AND IF LIKED ADD COLOR


            <div class="fav">
            <img style="width: 15px;" src="https://www.flaticon.com/svg/static/icons/svg/786/786432.svg" alt="">
            <form action="/api/items/favs/<%= elem.id %>" method="POST">
              <button style="color: blue;">
                Favourite
              </button>
            </form>
          </div>
