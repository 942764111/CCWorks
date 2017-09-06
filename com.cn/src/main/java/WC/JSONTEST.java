package WC;

import java.util.HashMap;
import java.util.Map;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;

public class JSONTEST {

	public String getdatetest() throws JsonProcessingException{
        Map<String, Object> map=
                new HashMap<String, Object>();
            map.put("name", "Tom");
            map.put("age", 10);
            map.put("phone", "110");
    		//使用jackson提供的api来转换
    		ObjectMapper om = 
    				new ObjectMapper();
		String jsonStr = 
				om.writeValueAsString(map);
		return jsonStr;
	}
}
