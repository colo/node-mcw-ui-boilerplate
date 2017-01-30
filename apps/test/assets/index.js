var test_page = null;

head.ready('mootools-more'
, function() {
	
	var TestModel = new Class({
		Implements: [Options, Events],
		
		initialize: function(options){
			
			this.setOptions(options);
			this.key = "value";
			
		}
	});
	
	var TestPage = new Class({
		Extends: Page,
		
		options: {
			assets: null
		},
		
		initialize: function(options){
			var self = this;
			
			this.addEvent(this.ASSETS_SUCCESS, function(){
				console.log('test_page.ASSETS_SUCCESS');
				self.fireEvent(self.STARTED);
			});
							
			this.addEvent(this.STARTED, function(){
					
				if(mainBodyModel.test() == null){
					
					if(!self.model){
						self.model = new TestModel();
						//window.mdc.autoInit();
						console.log('test binding applied');
					}
					
					mainBodyModel.test(self.model);
					
					//ko.tasks.schedule(this.start_timed_requests.bind(this));
					
				}
				else{
					self.model = mainBodyModel.test();
				}
				
				
				
				window.mdc.autoInit();
 var menuEl = document.querySelector('.mdc-simple-menu');
      var menu = new mdc.menu.MDCSimpleMenu(menuEl);
      var toggle = document.querySelector('.toggle');
      toggle.addEventListener('click', function() {
        menu.open = !menu.open;
      });

      var dark = document.querySelector('input[name="dark"]');
      dark.addEventListener('change', function(evt) {
        if (evt.target.checked) {
          menuEl.classList.add('mdc-simple-menu--theme-dark');
        } else {
          menuEl.classList.remove('mdc-simple-menu--theme-dark');
        }
      });

      var radios = document.querySelectorAll('input[name="position"]');
      for (var i = 0; i < radios.length; i++) {
        radios[i].addEventListener('change', function(evt) {
          if (evt.target.checked) {
            if (evt.target.value) {
              var anchor = document.querySelector('.mdc-menu-anchor');
              anchor.style.removeProperty('top');
              anchor.style.removeProperty('right');
              anchor.style.removeProperty('bottom');
              anchor.style.removeProperty('left');

              var vertical = evt.target.value.split(' ')[0];
              var horizontal = evt.target.value.split(' ')[1];
              anchor.style.setProperty(vertical, '0');
              anchor.style.setProperty(horizontal, '0');
            }
          }
        });
      }

      var lastSelected = document.getElementById('last-selected');
      menuEl.addEventListener('MDCSimpleMenu:selected', function(evt) {
        const detail = evt.detail;
        lastSelected.textContent = '"' + detail.item.textContent.trim() +
          '" at index ' + detail.index;
      });
			});
			
			

			
			this.parent(options);
			
			
		}
		
	});

	if(mainBodyModel){
		console.log('mainBodyModel');
		test_page = new TestPage();
	}
	else{
		console.log('no mainBodyModel');
		
		root_page.addEvent(root_page.STARTED, function(){									
			test_page = new TestPage();
		});
	}	
	
	
});
