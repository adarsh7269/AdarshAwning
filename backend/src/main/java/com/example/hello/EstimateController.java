package com.example.hello;

import org.springframework.web.bind.annotation.*;
import java.util.*;

@RestController
@RequestMapping("/api/estimate")
@CrossOrigin(origins = "*")
public class EstimateController {

    // Material pricing per square foot (in INR)
    private static final Map<String, MaterialInfo> MATERIALS = new LinkedHashMap<>();

    static {
        MATERIALS.put("BASIC", new MaterialInfo(
                "Basic Polyester",
                "Standard quality polyester fabric. UV resistant coated, suitable for light commercial use.",
                350.0,
                "⭐"));
        MATERIALS.put("STANDARD", new MaterialInfo(
                "Standard Acrylic",
                "Solution-dyed acrylic fabric. Excellent color retention, water resistant, durable.",
                650.0,
                "⭐⭐"));
        MATERIALS.put("PREMIUM", new MaterialInfo(
                "Premium Canvas",
                "High-density woven canvas. Heavy-duty, weatherproof with anti-mold treatment.",
                950.0,
                "⭐⭐⭐"));
        MATERIALS.put("LUXURY", new MaterialInfo(
                "Luxury Sunbrella",
                "Top-grade Sunbrella fabric. Fade-proof, mold-proof, 10-year warranty backed.",
                1400.0,
                "⭐⭐⭐⭐"));
    }

    @GetMapping("/materials")
    public List<Map<String, Object>> getMaterials() {
        System.out.println("getMaterials called");
        List<Map<String, Object>> result = new ArrayList<>();
        for (Map.Entry<String, MaterialInfo> entry : MATERIALS.entrySet()) {
            Map<String, Object> m = new LinkedHashMap<>();
            m.put("id", entry.getKey());
            m.put("name", entry.getValue().name);
            m.put("description", entry.getValue().description);
            m.put("pricePerSqFt", entry.getValue().pricePerSqFt);
            m.put("stars", entry.getValue().stars);
            result.add(m);
        }
        return result;
    }

    @PostMapping("/calculate")
    public Map<String, Object> calculate(@RequestBody EstimateRequest request) {
        System.out.println("calculate called");
        MaterialInfo material = MATERIALS.get(request.getMaterialId());
        if (material == null) {
            throw new IllegalArgumentException("Invalid material selected");
        }

        // Convert feet to square feet
        double areaSqFt = request.getLengthFt() * request.getBreadthFt();

        // Base cost
        double baseCost = areaSqFt * material.pricePerSqFt;

        // Installation cost: flat 18% of base
        double installationCost = baseCost * 0.18;

        // Hardware/frame cost: flat 12% of base
        double hardwareCost = baseCost * 0.12;

        // Total
        double totalCost = baseCost + installationCost + hardwareCost;

        Map<String, Object> response = new LinkedHashMap<>();
        response.put("materialName", material.name);
        response.put("lengthFt", request.getLengthFt());
        response.put("breadthFt", request.getBreadthFt());
        response.put("areaSqFt", Math.round(areaSqFt * 100.0) / 100.0);
        response.put("pricePerSqFt", material.pricePerSqFt);
        response.put("baseCost", Math.round(baseCost));
        response.put("installationCost", Math.round(installationCost));
        response.put("hardwareCost", Math.round(hardwareCost));
        response.put("totalCost", Math.round(totalCost));
        return response;
    }

    static class MaterialInfo {
        String name;
        String description;
        double pricePerSqFt;
        String stars;

        MaterialInfo(String name, String description, double pricePerSqFt, String stars) {
            this.name = name;
            this.description = description;
            this.pricePerSqFt = pricePerSqFt;
            this.stars = stars;
        }
    }

    static class EstimateRequest {
        private String materialId;
        private double lengthFt;
        private double breadthFt;

        public String getMaterialId() {
            return materialId;
        }

        public void setMaterialId(String materialId) {
            this.materialId = materialId;
        }

        public double getLengthFt() {
            return lengthFt;
        }

        public void setLengthFt(double lengthFt) {
            this.lengthFt = lengthFt;
        }

        public double getBreadthFt() {
            return breadthFt;
        }

        public void setBreadthFt(double breadthFt) {
            this.breadthFt = breadthFt;
        }
    }
}
