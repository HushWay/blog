# 计算免疫marker得分
为了估样本的免疫状态，我们纳入了一系列已报道的免疫检查点及免疫活性相关基因特征。基于log2转换后的 TPM 表达谱数据，按照相关文献中描述的方法，在样本水平计算各类免疫特征评分，具体如下：
1. 免疫检查点及调节分子：直接使用关键基因的表达值，包括 _CD274_ (PD-L1)、_PDCD1_ (PD-1)、_PDCD1LG2_ (PD-L2) 以及 _CTLA4_ 等。
2. 细胞溶解活性（CYT）：定义为 _GZMA_ 和 _PRF1_ 两个基因表达的几何均值[Ref:25594174]。
3. IMPRES 信号得分：基于 15 个特定免疫检查点基因对之间的表达量配对比较计算获得[Ref:28650338]。
4. IFN-γ 信号得分：计算 6 个干扰素-γ 反应相关基因表达量的均值[Ref:28650338]。
5.  T cell-inflamed GEP 得分：基于包含 18 个基因的 GEP 特征集，经管家基因标化（Housekeeping-normalized）后，计算表达加权和 [Ref:28650338]。


**写法参考**
- Integrative molecular and clinical modeling of clinical outcomes to PD1 blockade in patients with metastatic melanoma, _Nature Medicine_, 2019
- Molecular and Genetic Properties of Tumors Associated with Local Immune Cytolytic Activity, Cell, 2015
- Biological knowledge graph-guided investigation of immune therapy response in cancer with graph neural network, Brief Bioinform, 2023
- IFN-γ–related mRNA profile predicts clinical response to PD-1 blockade, J Clin Invest, 2017
- Association of tumor mutational burden and T-cell–inflamed GEP with outcomes in PD-1–treated HCC, Annals of Oncology, 2019
