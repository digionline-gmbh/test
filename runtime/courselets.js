/*
 *
 * WebWeaver® Courselets JavaScript Library
 *
 * Copyright 1998-2013 DigiOnline GmbH
 *
 * http://www.digionline.de
 * http://www.webweaver.de
 *
 */

function object_courselet() {
  this.first_page_id=null; // ID erster Seite (evtl. erster mit Inhalt)
  this.page_id=null; // ID geladener Seite
  this.courselet_id=null; // ID des Courselets (nur im Suite-Modus)
  this.p_suite=true; // laeuft innerhalb WebWeaver Suite
  this.p_params=null; // run() uebergebene Parameter
  this.p_document_loaded=false; // einbindene HTML-Seite geladen
  this.p_xarr_courselet=null; // XArray: Courselet
  this.p_xarr_page=null; // XArray: Geladene Seite
  this.p_xarr_blocks=null; // XArray: Bloecke
  this.p_xarr_meta=null; // XArray: Meta-Block
  this.p_xarr_pages=null; // XArray: Seiten als Baum
  this.p_xarr_pages_flat=null; // XArray: Seiten flach
  this.p_xarr_pages_page=null; // XArray: geladene Seite im Baum
  this.p_ids_page=null; // IDs=>XArray: Seite
  this.p_ids_pages=null; // IDs=>XArray: Seiten
  this.p_ids_resources=null; // IDs=>XArray: Ressourcen (im Package-Modus)
  this.p_page_start=null; // Wann wurde die Seite geladen?
  this.p_is_exercise=false; // Seite hat Aufgaben
  this.p_is_only_one_attempt=false; // Seite darf nur einmal bearbeitet werden
  this.p_is_read_only=false; // Seite ist read-only
  this.p_result=null; // Ergebnis (1.0 = alles richtig)
  this.p_active_slider=null; // Gleiter, der gerade unter der Maus klebt
  this.p_clicked_slider=null; // Gleiter, der geklickt wurde (alternative Bedienung, falls kein Drag and Drop moeglich)
  this.p_click_areas=null; // Liste aller "Click-Areas"
  this.p_load_error=null; // Fehler beim Laden
  this.p_reposition_objects=null; // DOM-Objekte, die an anderen ausgerichtet sind und mit diesen verschoben werden sollen
  this.p_marked_events=null; // Vergemerkte Events beim Generieren der Seite
  this.p_preview_results=false; // Loesungen anzeigen
  this.p_suspend_data=null; // Derzeit nur SCORM-Daten
  this.p_flash_detected=null; // Ergebnis Flash-Detection
  this.courselet=this;
  this.translations={
    button_evaluation: { en:'Evaluation', de:'Auswertung', fr: 'Valider', it:'Valutazione', es:'Evaluación', tr:'Değerlendirme' },
    only_one_attempt: { en:'This exercise can only be done once.', de:'Diese Aufgabe kann nur einmal bearbeitet werden.', fr:'Cet exercice ne peut être réalisé qu\'une seule fois.', it:'Questo esercizio può essere lavorato solo una volta.', es:'Este ejercicio sólo se puede realizar una vez.', tr:'Bu Görev sadece bir kez işlenebilir.'},
    read_only: { en: 'This task is already completed.', de:'Diese Aufgabe wurde bereits bearbeitet.', it:'Questo compito è già stato elaborato.', fr:'Cette tâche a déjà été traitée.', es:'Este ejercicio ya se ha realizado',tr: 'Bu Ödev henüz düzenlenmedi.'},
    target_not_found: { en:'The specified target was not found.', de:'Das angegebene Ziel wurde nicht gefunden.', fr: 'La destination choisie n\'a pas été trouvée.', it:'L\'oggetto indicato non è stato trovato.', es:'No se encontró el destino indicado.', tr:'Tanımlanan hedef bulunamadı' },
    link_next_page: { en:'Continue with "%1"', de:'Weiter mit "%1"', fr:'Continuer avec "%1"', it:'Segue con "%1"', es:'Continuar con "%1"',tr: '"%1" ile devam' },
    date: { en:'d/m/Y', de:'d.m.Y', fr:'d/m/Y', it:'d-m-Y', es:'d-m-Y', tr:'d.m.Y'},
    time: { en:'H:i', de:'H:i', fr:'H:i', it:'H:i', es:'H:i', tr:'H:i'},
    overview_passed: '%1',
    overview_score: '%1',
    overview_percent: '%5 %',
    overview_score_score_max: '%1 / %2',
    overview_score_score_max_attempts: { en:'%1 / %2 in %3 attempt(s)', de:'%1 / %2 in %3 Versuch(en)', fr:'%1 / %2 en %3 essais', it:'%1 / %2 in %3 prova(e)', es:'%1 / %2 en %3 intento(s)', tr:'%3 Denemede %1 / %2 in' },
    overview_score_score_max_time: { en:'%1 / %2 in %4 second(s)', de:'%1 / %2 in %4 Sekunde(n)', fr:'%1 / %2 en %4 secondes', it:'%1 / %2 in %4 secondo(i)', es:'%1 / %2 en %3 segundo(s)', tr:'%4 Saniyede %1 / %2' },
    loading: { en:'Please wait!', de:'Bitte warten!', fr: 'Merci de patienter!', it:'Attendere, per cortesia!', es:'Espere por favor.', tr:'Lütfen Bekleyin!' },
    standalone: { en:'Stand-alone mode: No results are transmitted.', de:'Lokaler Modus: Es wird kein Ergebnis übertragen.', fr:'Mode local: aucune transmission de résultats.', it:'Modo stand-alone: Nessun risultato viene trasmesso.', es:'Modo local: No se transmiten resultados.', tr:'Yerel Modül: Sonuç taşınmayacak.'},
    nav_error_scorm: { en:'SCORM mode: No internal navigation is possible. Please use the navigation elements of your LMS.', de:'SCORM-Modus: Eine interne Navigation ist nicht möglich. Bitte verwenden Sie die Navigationselemente Ihres LMS.', fr:'Mode SCORM: navigation interne impossible. Veuillez utiliser les éléments de navigation de votre plateforme de formation à distance (LMS).', es:'Modo SCORM: No es posible una navegación interna. Por favor, utilize los elementos de navegación de su sistema de gestión del aprendizaje (LMS).', tr:'SCORM-Modülü: Sistemiçi yönlendirme mümkün değil. Lütfen Öğrenim Yönetim Sisteminize (LMS) ait yönlendirme unsurlarını kullanın.'},
    load_error_access_denied: 'Access denied',
    load_error_courselet_not_found: 'Courselet not found',
    load_error_no_valid_license: { en:'No valid licence found.', de:'Es wurde leider keine nutzbare Lizenz gefunden.', fr:'Aucune licence valable trouvée.', es:'No se encuentra una licencia válida.', it:'Non esiste una licenza valida.', tr:'Geçerli bir lisans bulunamadı'},
    load_error_general: 'Unknown error while loading.',
    bottom:0
  };
  this.src_suite={
    feedback: '../pics/courselets/i_feedback.gif',
    right: '../pics/courselets/i_right.gif',
    wrong: '../pics/courselets/i_wrong.gif',
    undone: '../pics/courselets/i_undone.gif',
    passed: '../pics/courselets/i_passed.gif',
    crosshairs: '../pics/courselets/m_crosshairs.png',
    mediaplayer: '/misc/mediaplayer.swf',
    bottom:0
  };
  this.src_package={
    feedback: 'runtime/i_feedback.gif',
    right: 'runtime/i_right.gif',
    wrong: 'runtime/i_wrong.gif',
    undone: 'runtime/i_undone.gif',
    passed: 'runtime/i_passed.gif',
    crosshairs: 'runtime/m_crosshairs.png',
    mediaplayer: 'runtime/mediaplayer.swf',
    xml: 'courselet.xml',
    bottom:0
  };
  this.src=function(ident) {
    var arr;
    if(this.p_suite) {
      arr=this.src_suite;
    } else {
      arr=this.src_package;
    }
    if(ident) {
      return arr[ident];
    } else {
      return arr;
    }
  };
  this.run=function(params) { // Diese Methode wird von aussen aufgerufen, Parameter: dom_id_courselet, url_page, url_talkback, page_id, url_page_format, dom_id_breadcrumb, scorm, locale, user_name, user_id
    if(params) {
      this.p_params=params;
    } else {
      this.p_params={};
    }
    if(!this.p_params['locale']) {
      var t_lang=navigator.language?navigator.language:navigator.browserLanguage;
      if(t_lang) {
        this.p_params['locale']=t_lang.substr(0,2).toLowerCase();
      }
    }
    if(!this.p_params['dom_id_courselet']) {
      this.p_params['dom_id_courselet']='courselet';
    }
    if(!this.p_params['dom_id_breadcrumb']) {
      this.p_params['dom_id_breadcrumb']='courselet_breadcrumb';
    }
    if(!this.p_params['url_page']) {
      this.p_suite=false;
      if(!this.p_params['url_page_format']) {
        this.p_params['url_page_format']='xml';
      }
    }
    if(!this.p_params['url_page_format']) {
      this.p_params['url_page_format']='json';
    }
    this.p_params['scorm']=this.p_params['scorm']?true:false;
    this.p_preview_results=this.p_params['author_mode'];
    if(!this.p_params['user_id']) {
      this.p_params['user_id']='anonymous';
    }
    if(!this.p_params['user_name']) {
      this.p_params['user_name']='Anonymous';
    }
    if(this.p_document_loaded) {
      this.p_first_load();
    };
  };
  this.load_page=function(page_id) { // Von "aussen" bestimmte Seite laden
    this.p_load_page(page_id);
  };
  this.d=function(s) {
    $('#debug').empty().text(s);
  };
  this.d2=function(s) {
    $('#debug2').empty().text(s);
  };
  this.event_document_loaded=function() {
    this.p_document_loaded=true;
    if(this.p_params) {
      this.p_first_load();
    }
  },
  this.p_cache_images=function() {
    this.p_image_cache={};
    for(var name in this.src()) {
      if(this.src(name) && this.src(name).match(/(gif|jpg|png)$/)) {
        this.p_image_cache[name]=new Image();
        this.p_image_cache[name].src=this.src(name);
      }
    }
  };
  this.p_lg=function(id,p1,p2,p3,p4,p5) {
    var result='['+id+']';
    if(this.translations[id]) {
      if(typeof(this.translations[id])=='object') {
        if(this.translations[id][this.p_params['locale']]) {
          result=this.translations[id][this.p_params['locale']];
        } else {
          result=this.translations[id].en;
        }
      } else {
        result=this.translations[id];
      }
    } else {
      alert('p_lg: "'+id+'" is unknown.');
    }
    return result.replace(/%1/,p1).replace(/%2/,p2).replace(/%3/,p3).replace(/%4/,p4).replace(/%5/,p5);
  };

  this.show_feedback=function(evt) {
    if(evt.data) {
      var evt_move=function(evt) {
        var $element=$('#courselet_element_feedback');
        var $window=$(window);
        if($element.width()>($window.width()*0.4)) {
          $element.width($window.width()*0.4);
        }
        var n_left=(((evt.clientX?evt.clientX:0)>($window.width()/2))?(evt.pageX-$element.outerWidth()-2):(evt.pageX+10));
        var n_top=(((evt.clientY?evt.clientY:0)>($window.height()/2))?(evt.pageY-$element.outerHeight()-2):(evt.pageY+10));
        $element.css({'left':n_left+'px','top':n_top+'px'});
      };
      $('#courselet_element_feedback').remove();
      $('<div id="courselet_element_feedback" style="display:none;position:absolute;left:0px;top:0px;z-Index:'+(60000+1)+'">'+evt.data+'</div>').appendTo('body').fadeIn('fast');
      evt_move(evt);
      $(evt.currentTarget).bind('mouseleave.temp',function(evt) {
        $(evt.currentTarget).unbind('.temp');
        $('#courselet_element_feedback').remove();
      }).bind('mousemove.temp',evt_move);
    }
  };

  this.p_update_feedback_block=function(xarr_block,current_score) {
    var id_block=xarr_block['@id'];
    var xarr_elements=xarr_block['element'];
    if(xarr_elements) {
      var $obj_block=$('#'+id_block);
      var feedback_max_score=0;
      var feedback_start_id=xarr_elements[0]['@id'];
      var feedback_end_id='';
      for(var e_i in xarr_elements) {
        var xarr_element=xarr_elements[e_i];
        if(xarr_element['@type']=='feedback_score') {
          var score=parseInt(xarr_element[0]);
          if((score>=feedback_max_score)&&(score<=current_score)) {
            feedback_max_score=score;
            feedback_start_id=xarr_element['@id'];
            feedback_end_id='';
          } else if(!feedback_end_id) {
            feedback_end_id=xarr_element['@id'];
          }
        }
      }
      var i_loop=0;
      $obj_block.hide().children().hide().filter('#'+feedback_start_id).nextAll().andSelf().each(function(i) {
        var id=$(this).attr('id');
        if(feedback_end_id && (id==feedback_end_id)) {
          return false;
        }
        $(this).show();
        i_loop++;
        return true;
      });
      if(i_loop) {
        $obj_block.show();
      }
    }
  };

  this.p_update_feedbacks=function(step,global_score,page_score) {
    $('span.score_global').html(global_score);
    $('span.score_page').html(page_score);
    for(var b_i in this.p_xarr_blocks) {
      var xarr_block=this.p_xarr_blocks[b_i];
      if(xarr_block['@type']=='feedback') {
        if(xarr_block['@counting']&&(step||(xarr_block['@visibility']=='always'))) {
          var current_score=((xarr_block['@counting']=='global')?global_score:page_score);
          this.p_update_feedback_block(xarr_block,current_score);
        }
      }
    }
  };

  this.p_evaluate=function() {
    this.d('Evaluating');
    var c_this=this;
    var class_names='.courselet_block_feedback,.courselet_icon_feedback_right,.courselet_icon_right,.courselet_icon_feedback_wrong,.courselet_icon_wrong,.courselet_audio_feedback_right,.courselet_audio_feedback_wrong';
    $(class_names).remove();
    var page_right=0;
    var page_total=0;
    var diff_right=0;
    for(var b_i in this.p_xarr_blocks) {
      var block_right=0;
      var block_total=0;
      // this.d('Evaluating '+b_i);
      var xarr_block=this.p_xarr_blocks[b_i];
      var id_block=xarr_block['@id'];
      var obj_block=document.getElementById(id_block);
      var xarr_elements=xarr_block['element'];
      if(xarr_block['@type']=='feedback') {
        if(!xarr_block['@counting']) { // Differenziertes Feedback, vorangegangene Aufgaben
          this.p_update_feedback_block(xarr_block,diff_right);
          diff_right=0;
        }
      } else {
        if(xarr_elements) {
          for(var e_i in xarr_elements) {
            var xarr_element=xarr_elements[e_i];
            var id_element=xarr_element['@id'];
            this.d('Evaluating '+b_i+'-'+e_i+': '+id_element+' '+xarr_element['@type']);
            var obj_element=document.getElementById(id_element);
            var $obj_feedback=$(obj_element);
            var is_right=false;
            var is_exercise=true;
            switch(xarr_element['@type']) {
              case 'checkbox':
                is_right=(this.to_bool(xarr_element[0])==this.to_bool(obj_element.checked));
                break;
              case 'select':
              case 'input':
                is_right=this.is_equal(xarr_element[0],$(obj_element).val());
                break;
              case 'slider_target':
                is_right=this.is_equal(xarr_element[0],$('.courselet_slider[idref=\''+id_element+'\']').html());
                break;
              case 'horizontal_radios':
                $('input[name=\'r:'+id_element+'\']').each(function() {
                  if($(this).attr('checked') && c_this.is_equal(xarr_element[0],$(this).val())) {
                    is_right=true;
                  }
                });
                break;
              case 'click_area':
                $obj_feedback=null;
                var coords=this.explode_to_ints(',',xarr_element['@coords']);
                for(var i in this.p_click_areas) {
                  var a=this.p_click_areas[i];
                  if((a[0]==id_block) && (a[1]==id_element)) {
                    $obj_feedback=$(obj_element.firstChild);
                    is_right=((a[2]>=coords[0]) && (a[3]>=coords[1]) && (a[2]<=coords[2]) && (a[3]<=coords[3]));
                  }
                }
                break;
              default:
                this.d('Evaluating '+b_i+'-'+e_i+': '+id_element+' '+xarr_element['@type']+' - skipped');
                is_exercise=false;
                break;
            }
            if(is_exercise) {
              block_total++;
              if(is_right) {
                if($obj_feedback) {
                  if(this.p_href(xarr_element,'audio_feedback_right')) {
                    $(this.p_draw_media({type:'audio',href:this.p_href(xarr_element,'audio_feedback_right'),style:'display:none',class_name:'courselet_audio_feedback_right'})).insertAfter($obj_feedback);
                  }
                  if(xarr_element['@feedback_right']) {
                    $('<img class="courselet_icon_feedback_right" src="'+this.src('feedback')+'" style="display:none">').insertAfter($obj_feedback).bind('mouseover',xarr_element['@feedback_right'],this.show_feedback);
                  }
                  $obj_feedback.after('<img class="courselet_icon_right" src="'+this.src('right')+'" style="display:none">');
                }
                block_right++;
              } else {
                if($obj_feedback) {
                  if(this.p_href(xarr_element,'audio_feedback_wrong')) {
                    $(this.p_draw_media({type:'audio',href:this.p_href(xarr_element,'audio_feedback_wrong'),style:'display:none',class_name:'courselet_audio_feedback_wrong'})).insertAfter($obj_feedback);
                  }
                  if(xarr_element['@feedback_wrong']) {
                    $('<img class="courselet_icon_feedback_wrong" src="'+this.src('feedback')+'" style="display:none">').insertAfter($obj_feedback).bind('mouseover',xarr_element['@feedback_wrong'],this.show_feedback);
                  }
                  $obj_feedback.after('<img class="courselet_icon_wrong" src="'+this.src('wrong')+'" style="display:none">');
                }
              }
            }
          }
        }
      }
      if(block_total) {
        if((block_total==block_right) && xarr_block['@feedback_right']) {
          $('<div class="courselet_block_feedback" style="display:none">'+this.html(xarr_block['@feedback_right'])+'</div>').appendTo(obj_block);
        }
        if((block_total>block_right) && xarr_block['@feedback_wrong']) {
          $('<div class="courselet_block_feedback" style="display:none">'+this.html(xarr_block['@feedback_wrong'])+'</div>').appendTo(obj_block);
        }
        var block_score_total=(parseInt(xarr_block['@score_max'])>0)?parseInt(xarr_block['@score_max']):block_total;
        var block_score_right=0;
        switch(xarr_block['@score_mode']) {
          case 'all_right':
            block_score_right=(block_right==block_total)?block_score_total:0;
            break;
          default:
            block_score_right=parseInt(((block_right*block_score_total)/block_total).toString()); // Abrunden
            break;
        }
        page_right+=block_score_right;
        page_total+=block_score_total;
        diff_right+=block_score_right;
      }
    }
    this.p_result=(page_right/page_total);
    this.d('Evaluated: '+page_right+'/'+page_total);
    this.p_send_score(page_right,page_total);
    this.p_update_feedbacks(1,this.p_get_global_score(),page_right);
    this.p_is_read_only=(this.p_is_read_only || this.p_is_only_one_attempt);
    var feedback_mode=this.p_xarr_meta['@feedback'];
    if(feedback_mode!='0') {
      feedback_mode='1'; // default;
    }
    if(feedback_mode=='0') {
      this.p_load_next_page(true);
    } else {
      $(class_names).show();
      this.p_draw_init_bottom();
      this.p_reposition();
      this.p_register_events();
    }
  };

  this.p_get_global_score=function() {
    var score=0;
    for(var i in this.p_xarr_pages_flat) {
      score+=this.to_int(this.p_xarr_pages_flat[i]['@score']);
    }
    return score;
  };

  this.p_get_page_score=function() {
    return this.to_int(this.p_xarr_pages_page['@score']);
  };

  this.p_send_score=function(score,max_score) {
    this.d('Sending score');
    var dt=((new Date().getTime()-this.p_page_start.getTime())/1000).toFixed(0);
    if(this.p_suite) {
      var url=this.p_params['url_talkback']+'&c='+this.p_params['courselet_id']+'&p='+this.page_id+'&s='+score+'&m='+max_score+'&t='+dt;
      $.ajax({async:true,cache:false,dataType:'text',url:url});
    } else if(this.p_params['scorm']) {
      this.p_scorm_set_value('cmi.core.score.raw',Math.round(score/max_score*100));
      if(score==max_score) {
        this.p_scorm_set_value('cmi.core.lesson_status','passed');
      }
      this.p_scorm_commit();
    } else {
      this.p_warning(this.p_lg('standalone'));
    }

    var t_ov_page=this.p_xarr_pages_page; // FIXME
    if(t_ov_page) { // Aktualisierung nur fuer interne Abfragen
      t_ov_page['@score']=(t_ov_page['@score']?Math.max(t_ov_page['@score'],score):score);
      t_ov_page['@attempts']=(t_ov_page['@attempts']?t_ov_page['@attempts']+1:1);
      t_ov_page['@time']=(t_ov_page['@time']?t_ov_page['@time']+dt:dt);
    }
    this.d2(this.json_encode(this.p_xarr_pages_flat));

    this.d('Score was sent.');
  };

  this.p_register_events=function() {
    var c_this=this;
    $('img').unbind('load.courselet').bind('load.courselet',function(evt) {
      c_this.p_evt_image_loaded(evt);
    });
    $('img').die('click.courselet').live('click.courselet',function(evt) {
      c_this.p_evt_image_clicked(evt);
    });
    $('img').unbind('mousemove.courselet').bind('mousemove.courselet',function(evt) {
      c_this.p_evt_image_mouse_move(evt);
    });
    $('img').unbind('mouseout.courselet').bind('mouseout.courselet',function(evt) {
      c_this.p_evt_image_mouse_out(evt);
    });
    $(window).unbind('resize.courselets').bind('resize.courselets',function(evt) {
      c_this.p_evt_resize(evt);
    });
    $(document).unbind('mousemove.courselets').bind('mousemove.courselets',function(evt) {
      c_this.p_evt_mouse_move(evt);
    });
    $(document).unbind('mouseup.courselets').bind('mouseup.courselets',function(evt) {
      c_this.p_evt_mouse_up(evt);
    });
    $('.courselet_slider').unbind().bind('mousedown',function(evt) {
      evt.preventDefault();
      c_this.p_activate_slider(evt.currentTarget,evt.pageX,evt.pageY);
    }).bind('dblclick',function(evt) {
      $(evt.currentTarget).attr('idref',$(evt.currentTarget).attr('source_idref'));
      c_this.p_reposition_sliders(true);
    });
    $('.courselet_slider_target').unbind().bind('click',function(evt) {
      evt.preventDefault();
      c_this.p_drop_active_slider(evt.pageX,evt.pageY,1);
    });
    $('#courselet_form').unbind().submit(function(evt) {
      evt.preventDefault();
      c_this.p_evaluate(evt);
    });
    $('.courselet_internal_link').unbind().click(function(evt) {
      c_this.p_evt_load_page(evt,true);
    });
    $('.courselet_path').unbind().change(function(evt) {
      c_this.p_load_page($(evt.currentTarget).val(),true);
    });
    $(window).unbind('unload.courselet').bind('unload.courselet',function(evt) {
      c_this.p_unload_page();
    });
    if(this.p_marked_events) {
      for(i in this.p_marked_events) {
        var a=this.p_marked_events[i];
        $(a[0]).bind(a[1],a[2],a[3]);
      }
      this.p_marked_events=null;
    }
  };
  this.p_mark_event=function(query,event_name,data,callback) {
    if(!this.p_marked_events) {
      this.p_marked_events=new Array();
    }
    this.p_marked_events.push([query,event_name,data,callback]);
  };

  this.p_evt_image_mouse_move=function(evt) {
    if(this.p_preview_results) {
      var $image=$(evt.currentTarget);
      if($image.hasClass('courselet_block_image')) {
        if(!$('#courselet_image_position').length) {
          $('body').append('<div id="courselet_image_position" style="display:none;position:absolute;left:100px;top:100px;background-color:white;padding:1px;border: 1px solid black">x</div>');
        }
        var offset=$image.offset();
        $('#courselet_image_position').fadeIn().text('x,y = '+(evt.pageX-offset.left)+','+(evt.pageY-offset.top)).offset({'left':evt.pageX+20,'top':evt.pageY});
      }
    }
  };

  this.p_evt_image_mouse_out=function(evt) {
    $('#courselet_image_position').remove();
  };

  this.p_evt_image_loaded=function(evt) {
    this.d('Image loaded.');
    this.p_reposition();
    var $image=$(evt.currentTarget);
    var id=this.get_ID($image);
    if(id) {
      var xarr_block=this.p_ids_page[id];
      if(xarr_block && xarr_block.element) {
        for(var i in xarr_block.element) {
          // alert(this.dump(xarr_block));
          var xarr_element=xarr_block.element[i];
          if(xarr_element && (xarr_element['@type']=='click_area')) {
            var coords=this.explode_to_ints(',',xarr_element['@coords']);
            // alert(this.dump(coords));
            if(coords[2] && coords[3] && (coords[0]<coords[2]) && (coords[1]<coords[3])) {
             // $image.after('<div onmouseover="this.style.display=\'none\';" style="position:relative;left:'+(coords[0])+'px;top:'+(coords[1]-$image.height())+'px;border:1px solid red;width:'+(coords[2]-coords[0])+'px;height:200px;height:'+(coords[3]-coords[1])+'px;overflow:hidden">&nbsp;</div>');
            }
          }
        }
      }
    }
  };

  this.p_evt_image_clicked=function(evt) {
    this.d('Image clicked.');
    var $image=$(evt.currentTarget);
    var image_offset=$image.offset();
    var x=evt.pageX-image_offset.left;
    var y=evt.pageY-image_offset.top;
    var id=this.get_ID($image);
    if(id) {
      if($image.hasClass('courselet_click_area_crosshairs')) {
        this.p_click_area_remove(id);
      }
      if(this.p_ids_page[id]) {
        if($image.hasClass('courselet_block_image')) {
          this.p_click_area_click(id,x,y); // Eigentlich auch nur bei Bloecken noetig
        }
        if($image.hasClass('courselet_magnification')) {
          this.show_image_layer(this.p_href(this.p_ids_page[id],'magnification'));
        }
      }

    }
  };

  this.show_image_layer=function(src) {
    $('#courselet_layer_image, #courselet_layer_black').remove();
    $('body').append('<div id="courselet_layer_black" style="position:'+this.p_position_fixed()+';left:0px;top:0px;height:100%;width:100%;background-color:black;display:none;z-Index:'+(60000+9)+'"></div>');
    $('#courselet_layer_black').fadeTo('normal',0.7);
    $('body').append('<table id="courselet_layer_image" style="position:'+this.p_position_fixed()+';left:0px;top:0px;height:100%;width:100%;display:none;z-Index:'+(60000+9)+'"><tr><td><table class="courselet_media" style="margin:auto"><tr><td><img src="'+src+'" alt=""></td></tr></table></td></tr></table>');
    $('#courselet_layer_image').fadeIn('fast').click(function() {$('#courselet_layer_image, #courselet_layer_black').stop().fadeOut('fast');});
  };

  this.p_evt_resize=function(evt) {
    this.d('Window resized.');
    this.p_reposition();
  };

  this.p_evt_mouse_move=function(evt) {
    this.d(evt.pageX+' x '+evt.pageY);
    this.p_move_active_slider(evt.pageX,evt.pageY);
  };

  this.p_evt_mouse_up=function(evt) {
    this.d('Mouse: up.');
    this.p_drop_active_slider(evt.pageX,evt.pageY,0);
  };

  this.p_evt_load_page=function(evt,by_user) {
    evt.preventDefault();
    var obj=evt.currentTarget;
    // var search=$(obj).html(); // text(): "<" vs. "&lt;"
    var search=$(obj).attr('title');
    var target_id=null;
    for(var i in this.p_xarr_pages_flat) {
      var xarr_page=this.p_xarr_pages_flat[i];
      if(this.is_equal(xarr_page['@title'],search)) {
      // if(xarr_page['@title']==search) {
        target_id=xarr_page[this.p_params['author_mode']?'@id':'@filled_id'];
      }
    }
    if(target_id) {
      this.p_load_page(target_id,by_user);
    } else {
      alert(this.p_lg('target_not_found'));
    }
  };

  this.p_load_next_page=function(by_user) {
    this.p_load_page(this.p_ids_pages[this.page_id]['@next_filled_id'],by_user);
  };

  this.p_first_load=function() {
    $('#'+this.p_params['dom_id_courselet']).text(this.p_lg('loading'));
    if(this.p_suite) {
      this.p_load_page(this.p_params['page_id']);
    } else {
      this.p_first_load_courselet(this.p_params['page_id']);
    }
  };

  this.p_first_load_courselet=function(page_id) {
    var c_this=this;
    var all_pages_started=false;
    var pages_loading=0;
    c_this.d('Loading '+c_this.src('xml'));
    $.get(c_this.src('xml'),function(data,status,xhr) {
      c_this.p_xarr_courselet=c_this.xml_to_xarray(data);
      if(c_this.p_xarr_courselet['courselet']) {
        c_this.d(c_this.src('xml')+' geladen');
        c_this.p_init_pages();
        var total_pages=c_this.p_xarr_pages_flat.length;
        for(var i=0;i<total_pages;i++) {
          var xarr_pages_page=c_this.p_xarr_pages_flat[i];
          pages_loading++;
          all_pages_started=(i==total_pages-1);
          var url=xarr_pages_page['@href'];
          c_this.d('Start loading '+url);
          $.get(url,function(data,status,xhr) {
            var xarr_page=c_this.xml_to_xarray(data);
            if(xarr_page['page']) {
              c_this.p_first_load_courselet_process_page(xarr_page);
              pages_loading--;
              if(all_pages_started && (pages_loading==0)) {
                c_this.d('All pages were loaded.');
                c_this.p_mark_next_pages();
                c_this.p_load_page(page_id?page_id:c_this.p_first_page_id);
              }
            } else {
              c_this.p_load_error=url+' could not be loaded.';
              c_this.p_warning();
            }
          },'text');
        }
      } else {
        c_this.p_load_error=c_this.src('xml')+' could not be loaded.';
        c_this.p_warning();
      }
    },'text');
  };

  this.p_first_load_courselet_process_page=function(xarr_page) {
    var page_id=xarr_page['page'][0]['@id'];
    var xarr_blocks=xarr_page['page'][0]['contents'][0]['block'];
    // var xarr_meta=xarr_blocks[0];
    var xarr_pages_page=this.p_ids_pages[page_id];
    if(!xarr_blocks[1]) {
      xarr_pages_page['@is_empty']=1;
    }
  };

  this.p_unload_page=function() { /* Aktuelle Seite nicht mehr gueltig */
    if(this.p_page_start) {
      this.d('Unloading page.');
      $('#'+this.p_params['dom_id_courselet']+' iframe,#'+this.p_params['dom_id_courselet']+' embed').remove(); // Eventuelle Destruktoren aufrufen, die per SCORM-API kommunizieren
      this.p_save_suspend_data();
      if(this.p_params['scorm']) {
        this.p_scorm_finish();
      }
      $('#courselet_layer_image, #courselet_layer_black').remove();
      this.p_page_start=null;
    }
  };

  this.p_load_page=function(page_id,by_user) {
    if(by_user && this.p_params['scorm']) {
      this.p_warning(this.p_lg('nav_error_scorm'));
    } else {
      var c_this=this;
      this.p_unload_page();
      this.d('Loading '+c_this.p_params['url_page_format']);
      var url='';
      if(this.p_suite) {
        url=c_this.p_params['url_page']+'&page_id='+page_id+'&timestamp='+parseInt(new Date().getTime()/1000);
      } else {
        url=this.p_ids_pages[page_id]['@href'];
      }
      switch(c_this.p_params['url_page_format']) {
        case 'html':
          if(page_id!=c_this.p_params['page_id']) {
            window.location.pathname=window.location.pathname.replace(/[^\/]+$/,page_id+'.html');
            break;
          }
          // continue xml
        case 'xml':
          $.get(url,function(data,status,xhr) {
            c_this.p_load_page_2(c_this.xml_to_xarray(data));
          },'text');
          break;
        case 'json':
          $.getJSON(url,function(data,status) {
            c_this.p_load_page_2(data);
          });
          break;
        default:
          alert('Unknown url_page_format: '+c_this.p_params['url_page_format']);
          break;
      }
    }
  };
  this.p_load_page_2=function(xarr) {
    this.p_is_read_only=true;
    this.p_load_error=null;
    if(xarr) {
      if(xarr['combined'] && xarr['combined'][0]) {
        this.p_xarr_page=xarr['combined'][0];
        this.p_xarr_courselet=xarr['combined'][0];
        this.p_init_pages();
        this.p_mark_next_pages();
      } else if(xarr['page']) {
        this.p_xarr_page=xarr;
      } else {
        if(xarr['error'] && xarr['error'][0] && xarr['error'][0][0]) {
          this.p_load_error=this.p_lg('load_error_'+xarr['error'][0][0]);
        } else {
          this.p_load_error=this.p_lg('load_error_general');
        }
      }
      if(this.p_xarr_page && this.p_xarr_page['page']) {
        this.p_xarr_blocks=this.p_xarr_page['page'][0]['contents'][0]['block'];
        this.p_xarr_meta=this.p_xarr_blocks[0];
        if(this.p_xarr_meta['@type']!='meta') {
          alert('Bad meta block in page');
        }
        this.page_id=this.p_xarr_page['page'][0]['@id'];
        this.p_ids_page=this.xarray_to_ids(this.p_xarr_page);
        //this.dump(this.p_ids_page);
        if(!this.page_id) {
          // alert('Im XML-Modus kann noch nicht auf die Page-ID zugegriffen werden. Bitte den JSON-Modus benutzen.');
        }
        // this.courselet_id=this.p_xarr_courselet['courselet']['@id'];
        // this.p_xarr_pages=this.p_xarr_courselet['courselet'][0]['pages'][0]['page'];
        // this.p_init_pages();
        this.p_mark_path();
        this.p_xarr_pages_page=this.p_ids_pages[this.page_id];
        this.p_is_only_one_attempt=(this.p_xarr_meta['@attempts']=='once');
        this.p_is_read_only=(this.p_is_only_one_attempt && this.p_xarr_pages_page['@attempts']);
        this.p_draw();
        this.p_page_start=new Date();
        this.p_cache_images();
        if(this.p_params['scorm']) {
          this.p_scorm_initialize();
        }
      }
    } else {
      this.p_load_error=this.p_lg('load_error_general');
    }
    if(this.p_load_error) {
      this.p_warning();
    }
  };

  this.xarray_to_ids=function(xarr,internal) {
    if(!internal) {
      internal={};
    }
    for(var i in xarr) {
      var e=xarr[i];
      if(i=='@id') {
        internal[e]=xarr;
      } else if((typeof(e)=='array') || (typeof(e)=='object')) {
        this.xarray_to_ids(e,internal);
      }

    }
    return internal;
  };

  this.p_init_pages=function() {
    this.courselet_id=this.p_xarr_courselet['courselet']['@id'];
    this.p_xarr_pages=this.p_xarr_courselet['courselet'][0]['pages'][0]['page'];
    this.p_flatten_pages();
    this.p_ids_pages=this.xarray_to_ids(this.p_xarr_pages_flat);
    if(this.p_xarr_courselet['courselet'][0]['resources'] && this.p_xarr_courselet['courselet'][0]['resources'][0] && this.p_xarr_courselet['courselet'][0]['resources'][0]['resource']) {
      var xarr_resources=this.p_xarr_courselet['courselet'][0]['resources'][0]['resource'];
      this.p_ids_resources=this.xarray_to_ids(xarr_resources);
      // this.dump(this.ids_resources);
    }
  };

  this.p_flatten_pages=function(xarr_pages,level) {
    if(!level) {
      xarr_pages=this.p_xarr_pages;
      level=0;
      this.p_xarr_pages_flat=new Array();
    }
    for(var i in xarr_pages) {
      var xarr_page=xarr_pages[i];
      xarr_page['@level']=level;
      this.p_xarr_pages_flat[this.p_xarr_pages_flat.length]=xarr_page;
      if(xarr_page['page']) {
        this.p_flatten_pages(xarr_page['page'],level+1);
      }
    }
  };

  this.p_mark_next_pages=function() {
    if(this.p_xarr_pages_flat) {
      var next_id=this.p_xarr_pages_flat[0]['@id'];
      var next_filled_id=null;
      for(var i in this.p_xarr_pages_flat) {
        if(!this.p_xarr_pages_flat[i]['@is_empty']) {
          next_filled_id=this.p_xarr_pages_flat[i]['@id'];
          break;
        }
      }
      if(!next_filled_id) {
        next_filled_id=next_id;
      }
      for(var i=this.p_xarr_pages_flat.length-1;i>=0;i--) {
        this.p_xarr_pages_flat[i]['@next_id']=next_id;
        this.p_xarr_pages_flat[i]['@next_filled_id']=next_filled_id;
        next_id=this.p_xarr_pages_flat[i]['@id'];
        if(!this.p_xarr_pages_flat[i]['@is_empty']) {
          next_filled_id=next_id;
        }
        this.p_xarr_pages_flat[i]['@filled_id']=next_filled_id;
      }
      this.p_first_page_id=this.p_params['author_mode']?next_filled_id:next_id;
    }
  };

  this.p_mark_path=function(xarr_pages,level) {
    var result=false;
    if(!level) {
      xarr_pages=this.p_xarr_pages;
      level=0;
    }
    for(var i in xarr_pages) {
      var xarr_page=xarr_pages[i];
      xarr_page['@_path']=0;
      // xarr_page['@active']=0;
      if(xarr_page['@id']==this.page_id) {
        result=true;
        xarr_page['@_path']=1;
        // xarr_page['@active']=1;
      }
      if(xarr_page['page']) {
        if(this.p_mark_path(xarr_page['page'],level+1)) {
          result=true;
          xarr_page['@_path']=1;
        }
      }
    }
    return result;
  };

  this.p_draw_breadcrumb=function(xarr_pages,parent_id) {
    var html='';
    var html_next='';
    var html_options='';
    var level0=false;
    if(!xarr_pages) {
      xarr_pages=this.p_xarr_pages;
      level0=true;
    }
    for(var i in xarr_pages) {
      var xarr_page=xarr_pages[i];
      var selected=!(!(xarr_page['@_path']));
      // if(level0 || selected || this.p_params['author_mode'] || !xarr_page['@overview'] || (xarr_page['@overview']!='hidden')) {
      if(!xarr_page['@path'] || this.p_params['author_mode']) {
        html_options+='<option value="'+xarr_page[this.p_params['author_mode']?'@id':'@filled_id']+'"'+(selected?' selected':'')+'>'+xarr_page['@title']+'</option>';
        if(selected && xarr_page['page']) {
          html_next=this.p_draw_breadcrumb(xarr_page['page'],(!this.p_params['author_mode'] && xarr_page['@is_empty'])?null:xarr_page['@id']);
        }
      }
    }
    if(html_options) {
      html+='<select class="courselet_path">';
      if(parent_id) {
        html+='<option value="'+parent_id+'"></option>';
      }
      html+=html_options;
      html+='</select>';
      html+='&nbsp;'+html_next;
    }
    return html;
  };

  this.p_draw_init_bottom=function() {
    var $bottom=$('#courselet_bottom').empty();
    var is_e=this.p_is_exercise;
    var result=this.p_result;
    if(is_e) {
      if(this.p_is_read_only) {
        // $bottom.append('<p style="clear:left"><span id="courselet_no_button_evaluation">'+this.p_lg('read_only')+'</span></p>');
      } else if(!this.p_scorm_content_api_initialized) {
        $bottom.append('<p style="clear:left" id="courselet_bottom_submit"><input type="submit" id="courselet_button_evaluation" value="'+this.p_lg('button_evaluation')+'"></p>');
      }
    }
    var v=this.p_xarr_meta['@link_next_page'];
    if(!v) {
      v='after_attempt'; // default
    }
    if((v=='always')||((v=='after_attempt')&&(!is_e || !isNaN(result)))||((v=='after_right_solution'))&&(!is_e || (result==1))) {
      $bottom.append('<p style="clear:left;" id="courselet_bottom_next">'+this.p_lg('link_next_page',this.html('[['+this.p_ids_pages[this.p_xarr_pages_page['@next_filled_id']]['@title']+']]'))+'</p>');
    }
  };

  this.p_draw=function() {
    $('#'+this.p_params['dom_id_courselet']).fadeOut('normal');
    this.d('Drawing');
    var c_this=this;
    this.p_is_exercise=false;
    this.p_is_scorm_content=false;
    this.p_result=Number.NaN;
    this.p_click_areas=new Array();
    this.p_reposition_objects=new Array();
    this.p_scorm_content_api_destruct();
    var html='';
    html+='<form id="courselet_form">';
    html+=c_this.p_draw_inner();
    html+='<div id="courselet_bottom"></div>';
    html+='</form>';
/*
    html+=this.json_encode(this.p_xarr_page);
    html+='<br><br>';
    html+=this.json_encode(this.p_xarr_pages_flat);
*/
    if(this.p_params['dom_id_breadcrumb']) {
      $('#'+this.p_params['dom_id_breadcrumb']).empty().show().append(this.p_draw_breadcrumb());
    }
    $('#'+this.p_params['dom_id_courselet']).stop(true,true).empty().hide().append(html).fadeIn('normal');
    this.p_update_feedbacks(0,this.p_get_global_score(),this.p_get_page_score());
    this.p_draw_init_bottom();
    this.p_draw_init_inputs();
    this.p_draw_init_sliders_and_gaps();
    this.p_draw_init_click_areas();
    this.p_draw_init_horizontal_radios();
    this.p_register_events();
    this.p_warning();
    this.d('Finished drawing.');
  };

  this.p_is_flash_available=function() {
    if(this.p_flash_detected===null) {
      this.p_flash_detected=false;
      try {
        var a=navigator.plugins;
        if(a && (a.length>0)) { // Fast alle Browser
          for(var i in a) {
            if(a[i].name && a[i].name.match(/Shockwave Flash/)) {
              this.p_flash_detected=true;
            }
          }
        } else { // IE
          var obj=new ActiveXObject('ShockwaveFlash.ShockwaveFlash');
          if(obj && !obj.activeXError) {
            this.p_flash_detected=true;
          }
        }
      } catch(err) {
      }
    }
    return this.p_flash_detected;
  };

  this.p_draw_media=function(param) {
    var html='';
    var add=(param['class_name']?(' class="'+param['class_name']+'"'):'')+(param['style']?(' style="'+param['style']+'"'):'');
    var width=parseInt(param['width']);
    var height=parseInt(param['height']);
    var mime_type=this.mime_type(param['href']);
    switch(param['type']) {
      case 'audio':
        if(this.p_is_flash_available()) {
          height=15;
          width=16;
          html='<embed src="'+this.src('mediaplayer')+'" width="16" height="15" allowscriptaccess="always" allowfullscreen="true" flashvars="height=18&width=18&file='+encodeURIComponent(param['href'])+'&backcolor=0x000000&frontcolor=0xEEEEEE&lightcolor=0xFFFFFF&screencolor=0xFFFFFF&autostart=false"'+add+'>';
        } else {
          html='<audio controls="controls"'+add+'><source src="'+param['href']+'" type="'+mime_type+'"></audio>';
        }
        break;
      case 'video':
        if(this.p_is_flash_available() && (mime_type!=='video/ogg') && (mime_type!=='video/webm')) {
          height+=16;
          var path2video=(this.p_suite?'':'../'); // Ausschliesslich beim Video notwendig
          html='<embed src="'+this.src('mediaplayer')+'" width="'+width+'" height="'+height+'" allowscriptaccess="always" allowfullscreen="true" flashvars="height='+height+'&width='+width+'&file='+path2video+encodeURIComponent(param['href'])+'&backcolor=0x000000&frontcolor=0xEEEEEE&lightcolor=0xFFFFFF&screencolor=0xFFFFFF&autostart=false'+(param['still_href']?'&image='+encodeURIComponent(param['still_href']):'')+'"'+add+'>';
        } else { // iOS benoetigt http://www.w3.org/Protocols/rfc2616/rfc2616-sec14.html#sec14.35.1
          html='<video width="'+width+'" height="'+height+'" controls="controls"'+(param['still_href']?' poster="'+param['still_href']+'"':'')+add+'><source src="'+param['href']+'" type="'+mime_type+'"></video>';
        }
        break;
      case 'embed':
        html='<embed src="'+param['href']+'" width="'+width+'" height="'+height+'">';
        break;
      case 'iframe':
        html='<iframe src="'+param['href']+'" width="'+width+'" height="'+height+'"></iframe>';
        break;
    }
    html='<span class="courselet_plugin" style="display:inline-block;min-width:'+width+'px;min-height:'+height+'px">'+html+'</span>';
    return html;
  };

  this.p_href=function(xarr,attribute_name) {
    var result=null;
    if(xarr['@'+attribute_name+'_href']) {
      result=xarr['@'+attribute_name+'_href'];
    } else if(xarr['@'+attribute_name+'_idref'] && this.p_ids_resources && this.p_ids_resources[xarr['@'+attribute_name+'_idref']]) {
      result=this.p_ids_resources[xarr['@'+attribute_name+'_idref']]['@href'];
    } else if(xarr['@'+attribute_name]) {
      result=xarr['@'+attribute_name];
    }
    return result;
  };

  this.p_draw_inner=function() {
    var html='';
    var xarr_blocks=this.p_xarr_blocks; // p_xarr_page['page'][0]['contents'][0]['block'];
    var preview_results=this.p_preview_results;
    var select_options='';
    var horizontal_radios_options='';
    for(var b_i in xarr_blocks) {
      var xarr_block=xarr_blocks[b_i];
      var id_block=xarr_block['@id'];
      var html_elements='';
      var xarr_elements=xarr_blocks[b_i]['element'];
      for(var e_i in xarr_elements) {
        var xarr_element=xarr_elements[e_i];
        var e_id=xarr_element['@id'];
        if(xarr_element[0]==null) {
          xarr_element[0]='';
        }
        html_element='';
        html_element_prolog='';
        switch(xarr_element['@type']) {
          case 'line':
          case 'text':
            html_element+='<span class="courselet_text">'+this.html(xarr_element[0])+'</span>';
            break;
          case 'html':
            html_element+='<span class="courselet_html">'+xarr_element[0]+'</span>';
            break;
          case 'definition':
            var descr=xarr_element['@description'];
            html_element+='<span class="courselet_text'+(descr?' courselet_definition':'')+'">'+this.html(xarr_element[0])+'</span>';
            if(descr) {
              this.p_mark_event('#'+e_id,'mouseover',this.html(descr),this.show_feedback);
            }
            break;
          case 'heading3':
            html_element+='<h3>'+this.html(xarr_element[0])+'</h3>';
            break;
          case 'download':
            html_element+='<a href="'+this.p_href(xarr_element,'file')+'">'+xarr_element[0]+'</a>';
            break;
          case 'internal_link':
            html_element+='<a href="#" title="'+xarr_element['@page']+'" class="courselet_internal_link">'+xarr_element[0]+'</a>';
            break;
          case 'link':
            html_element+='<a href="'+this.p_href(xarr_element,'url')+'" target="_blank">'+xarr_element[0]+'</a>';
            break;
          case 'icon':
            html_element+='<img src="'+this.p_href(xarr_element,'image')+'"'+(xarr_element['@alt']?(' alt="'+xarr_element['@alt']+'" title="'+xarr_element['@alt']+'"'):'')+'>';
            break;
          case 'audio':
            html_element+=this.p_draw_media({type:'audio',href:this.p_href(xarr_element,'audio')});
            break;
/*
          case 'video':
            html_element+=this.p_draw_media({type:'video',href:this.p_href(xarr_element,'video'),still_href:this.p_href(xarr_element,'still'),width:xarr_element['@width'],height:xarr_element['@height']});
            break;
*/
          case 'slider_target':
            this.p_is_exercise=true;
            html_element+='<span class="courselet_slider_target" style="display:inline-block">'+(preview_results?xarr_element[0].replace(/\|.*/,'|..'):'&nbsp;')+'</span>';
            break;
          case 'slider':
            html_element+='<span class="courselet_slider_source" style="display:inline-block">'+xarr_element[0]+'</span>';
            break;
          case 'checkbox':
            this.p_is_exercise=true;
            html_element_prolog=(html_elements?'<br>':'');
            html_element+='<input type="checkbox"'+((preview_results && this.to_bool(xarr_element[0]))?' checked':'')+'>';
            break;
          case 'select':
            this.p_is_exercise=true;
            if(xarr_element['@options']) {
              select_options=xarr_element['@options'].split('|');
            }
            if(select_options) {
              html_element+='<select>';
              for(var i in select_options) {
                var option=this.trim(select_options[i]);
                html_element+='<option value="'+option+'"'+((preview_results && (xarr_element[0]==option))?' selected':'')+'>'+option+'</option>';
              }
              html_element+='</select>';
            }
            break;
          case 'horizontal_radios':
            this.p_is_exercise=true;
            var show_titles=false;
            if(xarr_element['@options']) {
              horizontal_radios_options=xarr_element['@options'].split('|');
              show_titles=true;
            }
            if(horizontal_radios_options) {
              html_element_prolog=(html_elements?'<br>':'');
              var html_titles='';
              var html_inputs='';
              for(var i in horizontal_radios_options) {
                var option=this.trim(horizontal_radios_options[i]);
                html_titles+='<span class="courselet_horizontal_radios_title" style="display:inline-block">'+option+'</span>';
                html_inputs+='<span class="courselet_horizontal_radios_input" style="display:inline-block"><input type="radio" name="r:'+e_id+'" value="'+option+'"'+((preview_results && (xarr_element[0]==option))?' checked':'')+'></span>';
              }
              html_element_prolog+=(show_titles?(html_titles+'<br>'):'')+html_inputs;
              html_element='<span></span>';
            }
            break;
          case 'input':
            this.p_is_exercise=true;
            html_element+='<input class="courselet_input" type="text" value="'+(preview_results?xarr_element[0]:'')+'" autocomplete="off">';
            break;
          case 'break':
            html_element+='<br>';
            break;
          case 'feedback_score':
            html_element+='<span></span>'; // '+xarr_element[0]+'
            break;
          case 'click_area':
            this.p_is_exercise=true;
            var x=-1;
            var y=-1;
            // var r=0;
            var coords=this.explode_to_ints(',',xarr_element['@coords']);
            this.p_click_areas.push(new Array(id_block,e_id,x,y,coords));
            html_element+='<span class="courselet_click_area" style="display:none;position:absolute;left:0px;top:0px;z-Index:'+(60000+1)+'"></span>';
            if(preview_results) {
              var temp_id='temp_id_'+e_id;
              html_element+='<span id="'+temp_id+'" style="display:block;width:'+(1+coords[2]-coords[0])+'px;height:'+(1+coords[3]-coords[1])+'px;background-color:red;opacity:0.5;position:absolute;left:0px;top:0px;overflow:hidden;z-Index:'+(60000+10)+'" onmouseover="this.style.display=\'none\'"></span>';
              this.p_reposition_objects.push(new Array('#'+id_block+' .courselet_block_image','#'+temp_id,coords[0]+(xarr_block['@border']?1:0),coords[1]+(xarr_block['@border']?1:0)));
            }
            break;
          case 'scorm_api':
            this.p_is_exercise=true;
            this.p_scorm_content_api_construct();
            html_element+='<span></span>'; // +'<span id="courselet_scorm_content_api_debug">SCORM-API</span>';
            break;
          case 'dynamic':
            var t='';
            switch(xarr_element[0]) {
              case 'user_id':
              case 'user_name':
                t=this.html(this.p_params[xarr_element[0]]);
                break;
              case 'now_date':
              case 'now_time':
                t=this.date(this.p_lg(xarr_element[0].substr(4)));
                break;
              case 'score_global':
              case 'score_page':
                t='<span class="'+xarr_element[0]+'">X</span>';
                break;
            }
            html_element+='<span>'+t+'</span>';
            break;
          default:
            html_element+='<span style="text-decoration:line-through">['+xarr_element[0]+']</span>';
            break;
        }
        html_element=html_element.replace(/^(<\w+)/,'$1'+' id="'+e_id+'"');
        html_elements+=html_element_prolog+html_element+'<span class="spacer"> </span>';
      }
      var html_block='';
      switch(xarr_block['@type']) {
        case 'heading1':
          html_block+='<h1>'+html_elements+'</h1>';
          break;
        case 'heading2':
          html_block+='<h2>'+html_elements+'</h2>';
          break;
        case 'paragraph':
          html_block+='<p>'+html_elements+'</p>';
          break;
        case 'list':
          html_block+='<ul class="bullets"><li>'+html_elements+'</li></ul>';
          break;
        case 'box':
          html_block+='<p>'+html_elements+'</p>';
          break;
        case 'image':
          html_block+='<table width="1%" class="courselet_media'+(xarr_block['@align']?(' courselet_alignment_'+xarr_block['@align']):'')+'"><tr><td><img class="courselet_block_image'+(xarr_block['@border']?' courselet_border':'')+(this.p_href(xarr_block,'magnification')?' courselet_magnification':'')+'" src="'+this.p_href(xarr_block,'image')+'"'+(xarr_block['@alt']?(' alt="'+xarr_block['@alt']+'" title="'+xarr_block['@alt']+'"'):'')+'></td></tr>'+(html_elements?'<tr><td>'+html_elements+'</td></tr>':'')+'</table>';
          break;
        case 'video':
          html_block+='<table width="1%" class="courselet_media'+(xarr_block['@align']?(' courselet_alignment_'+xarr_block['@align']):'')+'"><tr><td>'+this.p_draw_media({type:'video',href:this.p_href(xarr_block,'video'),still_href:this.p_href(xarr_block,'still'),width:xarr_block['@width'],height:xarr_block['@height']})+'</td></tr>'+(html_elements?'<tr><td>'+html_elements+'</td></tr>':'')+'</table>';
          break;
        case 'embed':
          html_block+='<table width="1%" class="courselet_media'+(xarr_block['@align']?(' courselet_alignment_'+xarr_block['@align']):'')+'"><tr><td>'+this.p_draw_media({type:'embed',href:this.p_href(xarr_block,'file'),width:xarr_block['@width'],height:xarr_block['@height']})+'</td></tr>'+(html_elements?'<tr><td>'+html_elements+'</td></tr>':'')+'</table>';
          break;
        case 'iframe':
          html_block+='<table width="1%" class="courselet_media'+(xarr_block['@align']?(' courselet_alignment_'+xarr_block['@align']):'')+'"><tr><td>'+this.p_draw_media({type:'iframe',href:(this.p_href(xarr_block,'file')+'/'+xarr_block['@link']),width:xarr_block['@width'],height:xarr_block['@height']})+'</td></tr>'+(html_elements?'<tr><td>'+html_elements+'</td></tr>':'')+'</table>';
          break;
        case 'overview':
          html_block+=this.p_draw_overview();
          break;
        case 'sliders':
          html_block+='<p class="courselet_sliders">'+html_elements+'</p>';
          break;
        case 'html':
          html_block+='<div class="courselet_html">'+html_elements+'</div>';
          break;
        case 'feedback':
          html_block+='<div class="courselet_page_feedback" style="display:none">'+html_elements+'</div>';
          break;
        case 'meta':
          break;
        default:
          html_block+='<p style="border: 2px solid black;text-decoration:line-through">['+html_elements+']</p>';
          break;
      };
      html_block=html_block.replace(/^(<\w+)/,'$1'+' id="'+id_block+'"');
      html+=html_block;

    }
    return html;
  };

  this.p_draw_overview=function () {
    var html='<ul class="courselet_overview">';
    for(var i in this.p_xarr_pages_flat) {
      var xarr_page=this.p_xarr_pages_flat[i];
      if(xarr_page['@overview']!='hidden') {
        html+='<li class="courselet_overview_levels courselet_overview_level'+Math.min(xarr_page['@level'],5)+'">';
        var overview_type=xarr_page['@overview'];
        if(!overview_type) {
          overview_type='score score_max'; // default
        }
        var score_max=parseInt(xarr_page['@score_max']);
        var score=parseInt(xarr_page['@score']);
        var attempts=parseInt(xarr_page['@attempts']);
        var time=parseInt(xarr_page['@time']);
        var percent=(score_max?Math.round(100*score/score_max):score);
        if((overview_type!='no_score') && score_max) {
          if(attempts) {
            if(overview_type.search(/passed/)>=0) {
              if(score==score_max) {
                score='<img class="courselet_icon_passed" src="'+this.src('passed')+'">';
              } else {
                score='<img class="courselet_icon_undone" src="'+this.src('undone')+'">';
              }
            }
          } else {
            percent=score='<img class="courselet_icon_undone" src="'+this.src('undone')+'">';
            if(overview_type.search(/score score_max/)>=0) {
              overview_type='score score_max';
            }
          }
          html+='<div class="courselet_overview_results">';
          html+=this.p_lg('overview_'+overview_type.replace(/ /g,'_'),score,score_max,attempts,time,percent);
          html+='</div>';
        }
        if(xarr_page['@is_empty'] && !this.p_params['author_mode']) {
          html+=this.html(xarr_page['@title']);
        } else {
          html+=this.html('[['+xarr_page['@title']+']]');
        }
        html+='</li>';
      }
    }
    html+='</ul>';
    return html;
  };

  this.p_text_width=function(solution,class_name) {
    var width=0;
    var a=String(solution).split('|');
    for(var i in a) {
      var s=this.trim(a[i]);
      var $elem=$('<span id="courselet_text_width" style="display:inline-block;visibility:hidden" class="'+class_name+'">'+s+'</span>').appendTo('#courselet');
      width=Math.max(width,$elem.width());
      $elem.remove();
    }
    return width;
  };

  this.p_draw_init_inputs=function() {
    var t_width=0;
    var c_this=this;
    $('.courselet_input').each(function(i) {
      var text=c_this.p_ids_page[$(this).attr('id')][0];
      t_width=Math.max(t_width,c_this.p_text_width(text,'courselet_input'));
    });
    $('.courselet_input').each(function(i) {
      $(this).width(t_width+2); // 2 -> FF
    });
  };

  this.p_equalize_size=function(sources,targets,add_width,add_height) {
    var t_width=0;
    var t_height=0;
    $(sources).each(function(i) {
      var $this=$(this);
      t_width=Math.max(t_width,$this.width());
      t_height=Math.max(t_height,$this.height());
    });
    $(targets).each(function(i) {
      if(!isNaN(add_width)) {
        $(this).width(t_width+add_width);
      }
      if(!isNaN(add_height)) {
        $(this).height(t_height+add_height);
      }
    });
  };

  this.p_draw_init_horizontal_radios=function() {
    this.p_equalize_size('.courselet_horizontal_radios_title,.courselet_horizontal_radios_input','.courselet_horizontal_radios_title,.courselet_horizontal_radios_input',0);
  };

  this.p_draw_init_sliders_and_gaps=function() {
    $('.courselet_slider').remove();
    $('.courselet_slider_source').each(function(i) {
      $('<div class="courselet_slider" idref="'+$(this).attr('id')+'" style="position:absolute;left:'+(50+i*20)+'px;top:'+(50+i*20)+'px;z-Index:'+(60000+1)+'" unselectable="on"></div>').html($(this).html()).appendTo('body');
    });
    this.p_equalize_size('.courselet_slider_source','.courselet_slider_source,.courselet_slider_target,.courselet_slider',2,0);
    this.p_reposition_sliders();
  };

  this.p_reposition_sliders=function(animate) {
    $('.courselet_slider').each(function(i) {
      var $this=$(this);
      if($this.attr('idref')) {
        var $pad=$('#'+$this.attr('idref'));
        if($pad) {
          var offset=$pad.offset();
          if(animate) {
            $this.stop(true).animate({left:offset.left+'px',top:offset.top+'px'},'fast','swing');
          } else {
            $this.stop(true).offset(offset);
          }
        } else {
          alert('"#'+$this.attr('idref')+'" not found.');
        }
      }
    });
  };

  this.p_activate_slider=function(obj,x,y) {
    var offset=$(obj).offset();
    var $obj=$(obj);
    this.p_active_slider={
      obj   : obj,
      dx    : offset.left-x,
      dy    : offset.top-y
    };
    this.p_clicked_slider=this.p_active_slider;
    if(!$obj.attr('source_idref')) {
      $obj.attr('source_idref',$obj.attr('idref'));
    }
    $obj.attr('idref',null).css('z-Index',60000+2);
  };

  this.p_move_active_slider=function(x,y) {
    if(this.p_active_slider) {
      $(this.p_active_slider['obj']).offset({left:x+this.p_active_slider['dx'],top:y+this.p_active_slider['dy']});
    }
  };

  this.p_drop_active_slider=function(x,y,is_clicked) {
    if(is_clicked) {
      this.p_active_slider=this.p_clicked_slider;
      this.p_clicked_slider=null;
    }
    if(this.p_active_slider) {
      this.d('Dropping');
      this.p_move_active_slider(x,y);
      var $obj=$(this.p_active_slider['obj']);
      this.p_active_slider=null;
      $obj.css('z-Index',60000);
      var offset=$obj.offset();
      var x=offset.left;
      var y=offset.top;
      var w=$obj.width();
      var h=$obj.height();
      var new_idref=null;
      var delta=(w+h);
      $('.courselet_slider_target').each(function(i) {
        var t_offset=$(this).offset();
        var t_delta=Math.sqrt(Math.pow(t_offset.left-x,2)+Math.pow(t_offset.top-y,2));
        if((t_delta<delta) && (Math.abs(t_offset.left-x)<w) && (Math.abs(t_offset.top-y)<(h+2))) {
          new_idref=$(this).attr('id');
          delta=t_delta;
        }
      });
      if(new_idref) {
        $('.courselet_slider[idref=\''+new_idref+'\']').each(function(i) {
          $(this).attr('idref',$(this).attr('source_idref'));
        });
        $obj.attr('idref',new_idref);
      } else {
        $obj.attr('idref',$obj.attr('source_idref'));
      }
      this.p_reposition_sliders(true);
    }
  };


  this.p_draw_init_click_areas=function() {
    this.p_click_area_reposition(1);
  };

  this.p_click_area_remove=function(element_id) {
    for(var i in this.p_click_areas) {
      if(this.p_click_areas[i][1]==element_id) {
        this.p_click_areas[i][2]=-1;
        this.p_click_areas[i][3]=-1;
        this.p_click_area_reposition(1);
      }
    }
  };

  this.p_click_area_click=function(block_id,x,y) {
    var empty=-1;
    var right=-1;
    for(var i in this.p_click_areas) {
      var a=this.p_click_areas[i];
      var coords=a[4];
      if(a[0]==block_id) {
        if((a[2]<0) && (a[3]<0)) {
          empty=i;
        }
        if((x>=coords[0]) && (y>=coords[1]) && (x<=coords[2]) && (y<=coords[3])) {
          right=i;
        }
      }
    }
    if(empty>=0) {
      if(right>=0) { // Bei Treffer auch gleich das richtige Fadenkreuz abgelegen
        this.p_click_areas[empty][2]=this.p_click_areas[right][2];
        this.p_click_areas[empty][3]=this.p_click_areas[right][3];
        this.p_click_areas[right][2]=x;
        this.p_click_areas[right][3]=y;
      } else {
        this.p_click_areas[empty][2]=x;
        this.p_click_areas[empty][3]=y;
      }
      this.p_click_area_reposition(1);
    }
  };

  this.p_click_area_reposition=function(init_crosshairs) {
    for(var i in this.p_click_areas) {
      var a=this.p_click_areas[i];
      var id=a[1];
      var x=0;
      var y=0;
      var $image=$('#'+a[0]+' img');
      var visible=false;
      var $marker=$('#'+id);
      if(init_crosshairs) {
        $marker.empty().append('<img class="courselet_click_area_crosshairs" src='+this.src('crosshairs')+'>');
      }
      if($image.length) {
        if((a[2]>=0) && (a[3]>=0)) {
          var $marker_image=$('#'+id+' img');
          $marker.show();
          var offset=$image.offset();
          x=parseInt(offset.left+a[2]-$marker_image.width()/2);
          y=parseInt(offset.top+a[3]-$marker_image.height()/2);
          $marker.offset({'left':x,'top':y});
          visible=true;
        }
      }
      if(!visible) {
        $marker.fadeOut('fast');
      }
    }
  };

  this.p_reposition=function() {
    this.p_reposition_sliders();
    this.p_click_area_reposition();
    if(this.p_reposition_objects) {
      for(var i in this.p_reposition_objects) {
        var a=this.p_reposition_objects[i];
        var $master=$(a[0]);
        var $slave=$(a[1]);
        if($master.length && $slave.length) {
          var offset=$master.offset();
          $slave.offset({'left':offset.left+a[2],'top':offset.top+a[3]});
        }
      }
    }
  };

  this.p_position_fixed=function() {
    return ((document.all && navigator.userAgent.match(/MSIE 6/))?'absolute':'fixed');
  };

  this.p_warning=function(text) {
    $('#courselet_warning').remove();
    var delay=3000;
    if(!text) {
      if(this.p_load_error) {
        text=this.p_load_error;
        delay=86400;
      } else if(this.p_is_read_only) {
        text=this.p_lg('read_only');
        delay=5000;
      } else if(this.p_is_only_one_attempt) {
        text=this.p_lg('only_one_attempt');
      }
    }
    if(text) {
      $('<p id="courselet_warning" style="display:none;position:'+this.p_position_fixed()+';left:25%;top:25%;width:50%;margin-left:auto;margin-right:auto;z-Index:'+(60000+1)+'"></p>').text(text).appendTo('body').fadeTo('normal',0.8).delay(delay).fadeOut().click(function(evt) {
        $(this).remove();
      });
    }
  };

  this.html=function(s) {
    s=s.replace(/\[\[([^\]<>\r\n|]+?)\|([^\]<>\r\n|]+?)\]\]/g,'<a href="#" title="$1" class="courselet_internal_link">$2</a>');
    s=s.replace(/\[\[([^\]<>\r\n]+?)\]\]/g,'<a href="#" title="$1" class="courselet_internal_link">$1</a>');
    return s;
  };

  this.trim=function(s) {
    return String(s).replace(/^\s+/,'').replace(/\s+$/,'');
  };

  this.p_xml_to_array_decode=function(s) {
    return this.trim(s).replace(/&gt;/g,'>').replace(/&lt;/g,'<').replace(/&amp;/g,'&');
  };

  this.xml_to_xarray=function (str_xml) {
    var result={};
    var level=-1;
    var result_path={};
    var element;
    result_path={0:result};
    //                 1    2             3                          4     5
    var reg_exp_tag=/<(\/?)(\w+(?::\w+)?)((?:\s+[\w:]+="[^"]*")*)\s*(\/?)>([^<]*)/g;
    var arr_tag;
    while(arr_tag=reg_exp_tag.exec(str_xml)) {
      tagname=arr_tag[2];
      if(!arr_tag[1]) {
        result_point=result_path[level+1];
        index=0;
        if(result_point[tagname]) {
          while(result_point[tagname][index]) {
            index++;
          }
        } else {
          result_point[tagname]={};
        }
        element={};
        if(arr_tag[3]) {
          var reg_exp_prop=/([\w:]+)="([^"]*)"/g;
          var arr_prop;
          while(arr_prop=reg_exp_prop.exec(arr_tag[3])) {
            element['@'+arr_prop[1]]=this.p_xml_to_array_decode(arr_prop[2]);
          }
        }
        if(this.trim(arr_tag[5])) {
          element[0]=this.p_xml_to_array_decode(arr_tag[5]);
        }
        result_point[tagname][index]=element;
        if(!arr_tag[4]) {
          level++;
          result_path[level+1]=element;
        }
      } else {
        level--;
      }
    }
    return result;
  };
  this.dump=function(o) {
    alert(this.json_encode(o));
  };
  this.json_encode=function(o) {
    var result='';
    if(o==null) {
      result+='null';
    } else {
      switch(typeof(o)) {
        case 'undefined':
          result+='null';
          break;
        case 'array':
          result+='[';
          var i=0;
          for(var x in o) {
            result+=(i>0?',':'')+this.json_encode(o[x]);
            i++;
          }
          result+=']';
          break;
        case 'object':
          result+='{';
          var i=0;
          for(var x in o) {
            result+=(i>0?',':'')+this.json_encode(x)+':'+this.json_encode(o[x]);
            i++;
          }
          result+='}';
          break;
        case 'boolean':
          result+=(o?'true':'false');
          break;
        case 'number':
          result+=o.toString();
          break;
        case 'string':
          result+='"'+o.replace(/"/,'\\"').replace(/\\/,'\\\\')+'"';
          break;
        default:
          result+='"'+typeof(o)+'"';
          break;
      }
    }
    return result;
  };
  this.sleep=function(ms) {
    var start=new Date();
    while(new Date().getTime() < ms + start.getTime()) {
    };
  };
  this.to_bool=function(x) {
    if(x && (x!='0')) {
      return true;
    } else {
      return false;
    }
  };
  this.to_int=function(s) {
    return (parseInt(s)?parseInt(s):0);
  };
  this.is_equal=function(solution,user) {
    var result=false;
    var a=String(solution).split('|');
    var tu=this.trim(user);
    for(var i in a) {
      var ta=this.trim(a[i]);
      if((ta==tu) || ($('<span />').html(ta).html()==$('<span />').html(tu).html()) || ($('<span />').text(ta).html()==$('<span />').html(tu).html()) || ($('<span />').html(ta).html()==$('<span />').text(tu).html())) {
        result=true;
      }
    }
    if(!result) {
      // alert(solution+' != '+user);
    }
    return result;
  };
  this.explode=function(c,s) {
    var result=new Array();
    if(s.length) {
      var t='';
      for(var i=0;i<s.length;i++) {
        if(s.charAt(i)==c) {
          result.push(t);
          t='';
        } else {
          t+=s.charAt(i); // s[i] nicht mit IE6
        }
      }
      result.push(t);
    }
    return result;
  };
  this.explode_to_ints=function(c,s) {
    var result=new Array();
    var arr=this.explode(c,s);
    for(var i in arr) {
      result.push(parseInt(arr[i])?parseInt(arr[i]):0);
    }
    return result;
  };
  this.get_ID=function($item) {
    var id=$item.attr('id');
    if(!id) {
      id=$item.parents('[id]').attr('id');
    }
    return id;
  };
  this.seconds_to_time_string=function(i) {
    i=Math.round(i);
    var s=i%60;
    var m=((i-s)/60)%60;
    var h=((i-s-60*m)/3600);
    return ((h<10)?('0'+h):h)+':'+((m<10)?('0'+m):m)+':'+((s<10)?('0'+s):s);
  };
  this.date=function(format,dt) {
    var t;
    if(!dt) {
      dt=new Date();
    }
    return format.replace(/d/g,(((t=dt.getDate())<10)?'0':'')+t).replace(/m/g,(((t=(dt.getMonth()+1))<10)?'0':'')+t).replace(/Y/g,dt.getFullYear()).replace(/H/g,(((t=dt.getHours())<10)?'0':'')+t).replace(/i/g,(((t=dt.getMinutes())<10)?'0':'')+t);
  };
  this.log=function(s) {
    window.setTimeout(function(){throw(new Error(s,''));},0);
  };
  this.mime_type=function(s) {
    // https://www.ww3-dev.de/wws/mime-types.php
    var a={"asp":"text/asp", "avi":"video/x-msvideo", "bmp":"image/x-ms-bmp", "bz2":"application/x-bzip", "css":"text/css", "doc":"application/msword", "docx":"application/vnd.openxmlformats-officedocument.wordprocessingml.document", "eml":"message/rfc822", "flv":"video/x-flv", "gif":"image/gif", "gz":"application/x-gzip", "htm":"text/html", "html":"text/html", "ico":"image/x-icon", "ics":"text/calendar", "iso":"application/x-iso9660-image", "jar":"application/java-archive", "jpe":"image/jpeg", "jpeg":"image/jpeg", "jpg":"image/jpeg", "js":"text/javascript", "json":"application/json", "mdb":"application/msaccess", "mml":"text/mathml", "mov":"video/quicktime", "mp2":"audio/mpeg", "mp3":"audio/mpeg", "mp4":"video/mp4", "mpeg":"video/mpeg", "mpg":"video/mpeg", "odb":"application/vnd.oasis.opendocument.database", "odf":"application/vnd.oasis.opendocument.formula", "odg":"application/vnd.oasis.opendocument.graphics", "odp":"application/vnd.oasis.opendocument.presentation", "ods":"application/vnd.oasis.opendocument.spreadsheet", "odt":"application/vnd.oasis.opendocument.text", "oga":"audio/ogg", "ogg":"video/ogg", "ogv":"video/ogg", "pdf":"application/pdf", "php":"text/php", "png":"image/png", "pps":"application/vnd.ms-powerpoint", "ppt":"application/vnd.ms-powerpoint", "pptx":"application/mspowerpoint", "psd":"image/x-photoshop", "pub":"application/x-mspublisher", "rar":"application/rar", "rtf":"text/rtf", "swf":"application/x-shockwave-flash", "txt":"text/plain", "vcf":"text/x-vcard", "wav":"audio/x-wav", "webm":"video/webm", "wma":"audio/x-ms-wma", "wmv":"video/x-ms-wmv", "wps":"application/vnd.ms-works", "wsdl":"text/xml", "xls":"application/vnd.ms-excel", "xlsx":"application/vnd.openxmlformats-officedocument.spreadsheetml.sheet", "xml":"text/xml", "zip":"application/zip"};
    if(s) {
      s=s.replace(/^.*\.([0-9a-zA-Z]+)$/,'$1');
      if(a[s]) {
        return a[s];
      }
    }
    return 'application/octet-stream';
  };

  /***** SCORM Content API ******/

  this.p_scorm_content_api_initialized=false;
  this.p_custom_properties={};

  this.p_scorm_content_api_construct=function() {
    if(!this.p_scorm_content_api_initialized) {
      // alert('construct');
      this.p_scorm_content_api_initialized=true;
      window.API={
        'LMSInitialize'     : this.scorm_content_api_initialize_1_2,
        'LMSFinish'         : this.scorm_content_api_finish,
        'LMSCommit'         : this.scorm_content_api_commit,
        'LMSGetValue'       : this.scorm_content_api_get_value,
        'LMSSetValue'       : this.scorm_content_api_set_value,
        'LMSGetLastError'   : this.scorm_content_api_get_last_error,
        'LMSGetErrorString' : this.scorm_content_api_get_error_string,
        'LMSGetDiagnostic'  : this.scorm_content_api_get_diagnostic,
        'error'             : 0,
        'courselet'         : this
      };
    }
  };

  this.p_scorm_content_api_destruct=function() {
    if(this.p_scorm_content_api_initialized) {
      //alert('destruct');
      window.API=null;
      this.p_scorm_content_api_initialized=false;
    }
  };

  this.p_load_suspend_data=function() {
    this.p_suspend_data={};
    if(this.p_suite) {
      var c_this=this;
      c_this.d('Loading suspend data.');
      $.ajax({
        'url'      : this.p_params['url_talkback']+'&c='+this.p_params['courselet_id']+'&load_suspend_data=1',
        'async'    : false,
        'cache'    : false,
        'dataType' : 'JSON',
        'success'  : function(data) {
          if(!(c_this.p_suspend_data=data)) {
            c_this.p_suspend_data={};
          }
          c_this.d('Suspend data loaded.');
          // alert(c_this.json_encode(data));
        },
        'error'    : function() {
          alert('Error loading suspend data.');
          c_this.p_suspend_data={};
        },
        'type'     : 'GET'
      });
    }
  };

  this.p_save_suspend_data=function() {
    if(this.p_suite) {
      if(this.p_suspend_data) {
        var c_this=this;
        c_this.d('Saving suspend data.');
        $.ajax({
          'type'     : 'POST',
          'url'      : this.p_params['url_talkback']+'&c='+this.p_params['courselet_id']+'&save_suspend_data=1',
          'data'     : {'suspend_data' : this.json_encode(this.p_suspend_data)},
          'success'  : function() {
            c_this.d('Suspend data saved.');
          },
          'dataType' : 'JSON',
          'async'    : false,
          'cache'    : false
        });
      }
    }
  };

  this.p_scorm_content_api_property=function(property,set,value) {
    var key=this.page_id;
    var dv='';
    window.API.error='0';
    switch(property) {
      case 'cmi.core._children':
        return 'student_name,student_id,lesson_location,credit,entry,score,lesson_status,total_time,exit,session_time'; // lesson_mode
      case 'cmi.core.student_id':
        return this.p_params['user_id'];
      case 'cmi.core.student_name':
        return this.p_params['user_name'];
      case 'cmi.core.lesson_location':
        break;
      case 'cmi.core.credit':
        return 'credit'; // no-credit
      case 'cmi.lesson_status':
        dv='not attempted';
        break;
      case 'cmi.core.entry':
        dv='ab-inito'; // resume
        break;
      case 'cmi.core.score._children':
        return 'raw,max,min';
      case 'cmi.core.score.raw':
      case 'cmi.core.score.max':
      case 'cmi.core.score.min':
        break;
      case 'cmi.core.total_time':
        return '0000:00:00.00';
      case 'cmi.core.exit':
      case 'cmi.core.session_time':
      case 'cmi.suspend_data':
        break;
      case 'cmi.launch_data':
        return '';
      case 'cmi.student_preference._children':
        return 'audio';
      case 'cmi.student_preference.audio':
      case 'cmi.student_preference.language':
      case 'cmi.student_preference.speed':
      case 'cmi.student_preference.text':
        key='global';
        break;
      default:
        window.API.error='401';
        break;
    }
    if(window.API.error='0') {
      if(!this.p_suspend_data) {
        this.p_load_suspend_data();
      }
      if(!this.p_suspend_data['SCORM'] || (this.p_suspend_data['SCORM']=='undefined')) {
        this.p_suspend_data['SCORM']={};
      }
      if(!this.p_suspend_data['SCORM'][key] || (this.p_suspend_data['SCORM'][key]=='undefined')) {
        this.p_suspend_data['SCORM'][key]={};
      }
      if(set) {
        this.p_suspend_data['SCORM'][key][property]=value;
      } else {
        return ((this.p_suspend_data['SCORM'][key][property] && (this.p_suspend_data['SCORM'][key][property]!='undefined'))?this.p_suspend_data['SCORM'][key][property]:dv);
      }
      if(set && ('cmi.core.score.raw'==property) && (parseInt(value) || ('0'==value)) && parseInt(this.p_suspend_data['SCORM'][key]['cmi.core.score.max'])) {
        this.p_send_score(Math.round(parseInt(value)*100/parseInt(this.p_suspend_data['SCORM'][key]['cmi.core.score.max'])),100);
      }
    }
    return '';
  };

  this.p_scorm_content_api_debug=function(message,property,value,result) {
    var s=message+'('+(property?property:'')+((value || (value===''))?(', \''+value+'\''):'')+');'+((result || (result===''))?(' // => \''+result+'\''):'');
    $('#courselet_scorm_content_api_debug').html($('#courselet_scorm_content_api_debug').html()+'<br>'+s);
  };

  this.scorm_content_api_initialize_1_2=function() {
    this.courselet.p_scorm_content_api_debug('SCORM_API_Initialize','API','1.2');
    window.API.error='0';
    return 'true';
  };

  this.scorm_content_api_finish=function() {
    this.courselet.p_scorm_content_api_debug('SCORM_API_Finish');
    window.API.error='0';
    this.courselet.p_scorm_content_api_property('cmi.core.entry',true,'resume');
    // this.courselet.scorm_content_api_commit();
    this.courselet.p_scorm_content_api_destruct();
    // this.p_send_score=function(score,max_score);
    return 'true';
  };

  this.scorm_content_api_commit=function() {
    this.courselet.p_scorm_content_api_debug('SCORM_API_Commit');
    window.API.error='0';
    // this.courselet.p_save_suspend_data(); Erst beim Unload der Seite
    return 'true';
  };

  this.scorm_content_api_get_value=function(property) {
    window.API.error='0';
    var value=this.courselet.p_scorm_content_api_property(property);
    this.courselet.p_scorm_content_api_debug('SCORM_API_GetValue',property,null,value);
    return value;
  };

  this.scorm_content_api_set_value=function(property,value) {
    window.API.error='0';
    this.courselet.p_scorm_content_api_debug('SCORM_API_SetValue',property,value);
    this.courselet.p_scorm_content_api_property(property,true,value);
    return 'true';
  };

  this.scorm_content_api_get_last_error=function() {
    window.API.error='0';
    this.courselet.p_scorm_content_api_debug('SCORM_API_GetLastError');
    var error=window.API.error;
    window.API.error='0';
    return error;
  };

  this.scorm_content_api_get_error_string=function(no) {
    window.API.error='0';
    this.courselet.p_scorm_content_api_debug('SCORM_API_GetErrorString');
    return 'No Error';
  };

  this.scorm_content_api_get_diagnostic=function() {
    window.API.error='0';
    this.courselet.p_scorm_content_api_debug('SCORM_API_GetDiagnostic');
    return 'true';
  };


  /***** SCORM API-Wrapper ******/

  this.p_scorm_api=null;

  this.p_scorm_get_api=function(win,i) {
    if(!i) {
      return this.p_scorm_get_api(window,1);
    } else if(win.API) {
      return win.API;
    } else if(i>10) {
      return null;
    } else if((win.parent!=null) && (win.parent!=win)) {
      return this.p_scorm_get_api(win.parent,i+1);
    } else if((win.opener!=null) && (typeof(window.opener)!='undefined')) {
      return this.p_scorm_get_api(win.opener,i+1);
    }
  };

  this.p_scorm_initialize=function() {
    this.p_scorm_api=this.p_scorm_get_api();
    if(this.p_scorm_api) {
      this.p_scorm_api.LMSInitialize('');
      // @todo
      var t=this.p_scorm_get_value('cmi.core.lesson_status');
      if(!t || (t=='not attempted')) {
        this.p_scorm_set_value('cmi.core.lesson_status','browsed');
      }
      this.p_scorm_set_value('cmi.core.score.min',0);
      this.p_scorm_set_value('cmi.core.score.max',100);
      this.p_scorm_commit();
    }
  };

  this.p_scorm_finish=function() {
    if(this.p_scorm_api) {
      var i=Math.round(((new Date().getTime()-this.p_page_start.getTime())/1000));
      this.p_scorm_set_value('cmi.core.session_time',this.seconds_to_time_string(i));
      this.p_scorm_commit();
      this.p_scorm_api.LMSFinish('');
      this.p_scorm_api=null;
    }
  };

  this.p_scorm_get_value=function(n) {
    if(this.p_scorm_api) {
      return this.p_scorm_api.LMSGetValue(n);
    }
  };

  this.p_scorm_set_value=function(n,v) {
    if(this.p_scorm_api) {
      this.p_scorm_api.LMSSetValue(n,v);
    }
  };

  this.p_scorm_commit=function(n,v) {
    if(this.p_scorm_api) {
      this.p_scorm_api.LMSCommit('');
    }
  };

};

var courselet=new object_courselet();

/*
$(function() {
  alert($('<span />').text('&').text());
});
*/


$(function() {
  courselet.event_document_loaded();
});

