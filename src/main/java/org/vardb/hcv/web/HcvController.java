package org.vardb.hcv.web;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.stereotype.Controller;
import org.springframework.ui.ModelMap;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.vardb.util.CException;

@Controller
public class HcvController {
	
	@RequestMapping("/")
    public String dflt() {
        return "index";
    }
	
	@RequestMapping("/index")
    public String index() {
		return "index";
    }
	
	@RequestMapping("/explorer")
    public String explorer() {
        return "explorer";
    }
}
